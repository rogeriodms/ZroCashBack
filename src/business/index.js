const { ReadFile } = require('../services/ReadFile')
const { Converter } = require('../services/Converter');
const { writeFileSync } = require('fs');

async function initService() {
 const bufferSales = await ReadFile('./sales.csv')
 const bufferCashBack = await ReadFile('./cashback.csv')
 const ArraySales = await Converter(bufferSales.toString());
 const ArrayCashBack = await Converter(bufferCashBack.toString());
 const ArrayFile = [];
    for(var i = 0; i<=ArraySales.length - 2; i++) {
        if(ArraySales[i].id !== null ){
            const dateHorsSales = ArraySales[i].created_at.split('T')
            const HMSsales = dateHorsSales[1].split(':')
            const dateSale = new Date(dateHorsSales[0])
            const t = {
                idSale: ArraySales[i].id,
                DateSale: ArraySales[i].created_at,
                Value: `R$ ${(ArraySales[i].amount/100).toString().replace('.',',')}`,
            }
            let contant = 0;
            for(var u = 0; u<=ArrayCashBack.length - 2; u++){
                if(ArrayCashBack[u].created_at && ArrayCashBack[u].id){
                    const dateHorsCash = ArrayCashBack[u].created_at.split('T')
                    const DateCash = new Date(dateHorsCash[0])
                    const HMSCashBack = dateHorsCash[1].split(':')
                    if(dateSale.toDateString() === DateCash.toDateString()){
                        if(parseInt(HMSCashBack[2]) < parseInt(HMSsales[2]) + 5 && parseInt(HMSCashBack[2]) >= parseInt(HMSsales[2])){
                            contant++
                            const BTC = (((((ArraySales[i].amount/100)/100)/2)/ArrayCashBack[u].amount) * 100000000).toFixed(2).replace('.',',')
                            ArrayFile.push({
                                ...t,
                                idCash: ArrayCashBack[u].id,
                                DateCash: ArrayCashBack[u].created_at,
                                "valueCashBack/BTC": ((ArrayCashBack[u].amount / 50000000)*2) ,
                                PriceBTC:  `R$ ${BTC.substr(0,(BTC.length/2)-1)}.${BTC.substr((BTC.length/2)-1)}` , 
                            })
                        }
                    }
                }
            }
            if(contant <= 0 ){
                ArrayFile.push({
                    ...t,
                    idCash: null,
                    DateCash: null,
                    "valueCashBack/BTC": null ,
                    PriceBTC: null, 
                })
            }
        }        
    }
    writeFileSync( './SalesCashBack.json',JSON.stringify(ArrayFile))
    console.log("File name with results:",'./SalesCashBack.json');
}

exports.initService = initService