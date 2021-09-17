const fs = require('fs')

async function ReadFile(File) {
   const buffer = fs.readFileSync(File, (err, data) => {
        if (err) {
          console.error('Error:', err)
        }
        console.log('Info:', 'file to Buffer')
        return data
      })
    return buffer
}

exports.ReadFile = ReadFile