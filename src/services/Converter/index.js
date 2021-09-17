async function Converter(File){
    const splitAll = File.split('\n')
    const splitHeader = splitAll[0].split(',')
    delete splitAll[0]
    const ArrayRespose = [];
    for(var n = 1; n <= splitAll.length - 1; n++){
        let cache = {};
        const content = splitAll[n].split(',')
        for(var i = 0; i <= splitHeader.length; i++) {
            
            if(content[i]){
                cache[splitHeader[i]] = content[i]
            }else{
                cache[splitHeader[i]] = null
            }
        }
        ArrayRespose.push(cache)
    }
    return ArrayRespose
}

exports.Converter = Converter
