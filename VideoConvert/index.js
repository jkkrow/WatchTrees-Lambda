const path = require('path');
const fs = require('fs');

const { updateJobSettings, createJob } = require('./lib/job');

exports.handler = async (event) => {
  console.log(JSON.stringify(event));

  const { MEDIA_CONVERT_ROLE, MEDIA_CONVERT_ENDPOINT, APPLICATION } =
    process.env;

  const SOURCE_BUCKET_IDENTIFIER = 'source';
  const CONVERTED_BUCKET_IDENTIFIER = 'converted';

  /**
   * Define inputs/ouputs, metadata.
   */
  const srcKey = decodeURIComponent(event.Records[0].s3.object.key).replace(
    /\+/g,
    ' '
  );
  const srcBucket = decodeURIComponent(event.Records[0].s3.bucket.name);
  const convertBucket = srcBucket.replace(
    SOURCE_BUCKET_IDENTIFIER,
    CONVERTED_BUCKET_IDENTIFIER
  );

  const { dir, base, name } = path.parse(srcKey);
  const inputPath = `s3://${srcBucket}/${srcKey}`;
  const outputPath = `s3://${convertBucket}/${dir}/${name}/`;

  const jobMetadata = {};

  jobMetadata['application'] = APPLICATION;
  jobMetadata['key'] = `${dir}/${name}/${name}`;
  jobMetadata['fileName'] = base;
  jobMetadata['treeId'] = srcKey.split('/')[2];

  let job;

  /**
   * Get job settings
   */
  job = JSON.parse(fs.readFileSync('jobs/video.json'));

  const thumbnailJob = JSON.parse(fs.readFileSync('jobs/thumbnail.json'));

  job.Settings.OutputGroups.push(thumbnailJob);

  /**
   * Parse settings file to update source / destination
   */
  job = await updateJobSettings(
    job,
    inputPath,
    outputPath,
    jobMetadata,
    MEDIA_CONVERT_ROLE
  );

  /**
   * Submit Job
   */
  await createJob(job, MEDIA_CONVERT_ENDPOINT);

  return;
};
