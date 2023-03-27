const mongoose = require('mongoose')
// const fs = require('node:fs')
// const path = require('node:path')
// onst { promisify } = require('util')
// const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3')

/* const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACESS_KEY,
  },
  region: 'sa-east-1',
}) */

const StudentSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  adress: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: false,
  },
  size: {
    type: Number,
    require: false,
  },
  key: {
    type: String,
    require: false,
  },
  url: {
    type: String,
    require: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
})

// mongoose middlware functionality
// intercepts actions on the database
// before saving in the database check if the url property is empty
// i will add the url in local environment
StudentSchema.pre('save', function (next) {
  if (!this.url) {
    this.url = `${process.env.APP_URL}/files/${this.key}`
  }
  next()
})

/* PostSchema.pre('deleteOne', async function (next) {
  if (process.env.STORAGE_TYPE === 'awsS3') {
    console.log(this.key)

    const params = { Bucket: process.env.BUCKET_AWS, Key: this.key }
    const command = new DeleteObjectCommand(params)
    await s3.send(command)

    next()
  }
  path.resolve(__dirname, '..', '..', 'tmp', 'uploads', this.key)
}) */

module.exports = mongoose.model('Student', StudentSchema)
