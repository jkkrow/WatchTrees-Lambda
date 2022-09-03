<div align="center">
  <a href="https://watchtree.net">
    <img src="https://raw.githubusercontent.com/jkkrow/watchtree-frontend/main/public/logo.svg" alt="Logo" width="100" height="100">
  </a>
  <h2 align="center">WatchTree</h2>
  <p align="center">
    A video streaming web application which provides on-demand videos (VOD) in adaptive media formats.
    <br />
    <a href="https://watchtree.net">
      <strong>Explore the live website »</strong>
    </a>
    <br />
    <br />
    <a href="https://github.com/jkkrow/watchtree-frontend">Frontend App</a>
    ·
    <a href="https://github.com/jkkrow/watchtree-backend">Backend API</a>
    ·
    <a href="https://github.com/jkkrow/watchtree-lambda">Lambda Code</a>
  </p>
</div>

## Lambda Code

This repository is an AWS Lambda function code for [WatchTree](https://watchtree.net) to run serverless jobs.

### Built with

- ![Javascript](https://img.shields.io/badge/Javascript-F7DF1E.svg?&style=for-the-badge&logo=Javascript&logoColor=black)
- ![Node.js](https://img.shields.io/badge/Node.js-339933.svg?&style=for-the-badge&logo=Node.js&logoColor=white)
- ![MongoDB](https://img.shields.io/badge/MongoDB-47A248.svg?&style=for-the-badge&logo=MongoDB&logoColor=white)
- ![Amazon AWS](https://img.shields.io/badge/AWS-232F3E.svg?&style=for-the-badge&logo=Amazon+AWS&logoColor=white)

## Functions

It contains functions for following jobs:

- **Convert Video with AWS MediaConvert**: It's triggered when a new video file is uploaded to S3 bucket, and submits a MediaConvert job to convert the video.

- **Update Database when the Convert Job Completed**: It's triggered when the convert job is completed and updates documents related to the video in the MongoDB collection.

## Getting Started

This is an instruction of how to use this code with AWS Lambda function.

### Prerequisites

You need an AWS account to run the function using AWS Lambda.

### Installation

1. Download the code or clone the repository

2. Navigate to one of the function directories and install dependencies.

```bash
cd <FUNCTION_DIRECTORY>
npm install
```

> If the dependency only contains `aws-sdk` or `dotenv`, you don't need to install.

3. Zip the directory with dependency modules.

4. Deploy the zip file to your AWS Lambda and configure settings such as triggers or environment variables.

## Related Apps

Here are related applications of WatchTree project.

- [WatchTree Frontend](https://github.com/jkkrow/watchtree-frontend): A frontend app of WatchTree created with React and Redux.
- [WatchTree Backend](https://github.com/jkkrow/watchtree-backend): A REST API for WatchTree built with Node.js and MongoDB to handle requests of frontend app.