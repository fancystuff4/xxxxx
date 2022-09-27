import { Injectable } from '@nestjs/common';
import * as AWS from "aws-sdk";
const moment = require('moment');

@Injectable()
export class FilesService {

    AWS_S3_BUCKET = process.env.AWS_BUCKET_NAME;
    s3 = new AWS.S3
        ({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_ACCESS_SECRET,
        });
    AWS_S3_BUCKET_LOCATION = process.env.AWS_REGION

    async uploadFile(file) {
        try {
            const path = `uploads/${moment().format('DD-MM-YYYY')}/`;
            const key = `${path}${moment().format('DD-MM-YYYY-hh-mm-ss') + file.originalname}`;
            const params = 
            {
                Bucket: this.AWS_S3_BUCKET,
                Key: key,
                Body: Buffer.from(file.buffer, 'binary'),
                ContentType: file.mimetype,
                ContentDisposition:"inline",
                CreateBucketConfiguration: 
                {
                    LocationConstraint: this.AWS_S3_BUCKET_LOCATION
                }
            };
            await this.s3.upload(params).promise();
            return `/files/getSignedUrl?key=${encodeURI(key)}`;
        } catch (error) {
            throw(error)
        }
    }

    async getSignedUrl(path) {
        try {
            const data = {
                Key: path,
                Bucket: this.AWS_S3_BUCKET,
                Expires: 21600,
            };
            return await this.s3.getSignedUrlPromise('getObject', data)
        } catch (error) {
            throw(error)
        }
    }

}
