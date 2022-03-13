const db = require('../models');
const fs = require('fs');
const fsPromises = require('fs/promises');

class UploadController {
  static async upload(req, res) {
    try {
        const { session } = req;
        const file = req.files['file'][0];

        await db.userUploads.build({ fileName: file.filename, userId: session.userId }).save();

        return res.status(201).send({success: true});
    } catch (error) {
        return res.status(500).send({message: 'Something went wrong'});
    }
  }

  static async getUserUploads(req, res) {
    try {
        const { session } = req;
        const { page } = req.query;
        const userUploads = await db.userUploads.findAndCountAll({ 
            where: {userId: session.userId},
            order: [
                ['id', 'DESC'],
            ], 
            limit: 10, 
            offset: (Number(page) - 1) * 10 });
        
        let result = userUploads.rows.map(item => ({ fileName: item.fileName }));

        for (const index in result) {
            const filePath = `files/${result[index].fileName}`;
            if (fs.existsSync(filePath)) {
                const file = await fsPromises.readFile(filePath);
                const base64 = Buffer.from(file).toString("base64");
                result[index].file = base64;
            }
        }
        result = result.map(item => {
            item.fileName = item.fileName.substring(item.fileName.indexOf('_') + 1);
            return item;
        });

        return res.send({result, count: userUploads.count});
    } catch (error) {
        return res.status(500).send({message: 'Something went wrong'});
    }
  }
}

module.exports = UploadController;