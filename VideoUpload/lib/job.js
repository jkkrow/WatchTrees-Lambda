const AWS = require('aws-sdk');

exports.updateJobSettings = async (
  job,
  inputPath,
  outputPath,
  metadata,
  role
) => {
  try {
    job.Settings.Inputs[0].FileInput = inputPath;
    job.UserMetadata = { ...job.UserMetadata, ...metadata };
    job.Role = role;

    const outputGroups = job.Settings.OutputGroups;

    for (let group of outputGroups) {
      switch (group.OutputGroupSettings.Type) {
        case 'FILE_GROUP_SETTINGS':
          group.OutputGroupSettings.FileGroupSettings.Destination = outputPath;
          break;
        case 'HLS_GROUP_SETTINGS':
          group.OutputGroupSettings.HlsGroupSettings.Destination = outputPath;
          break;
        case 'DASH_ISO_GROUP_SETTINGS':
          group.OutputGroupSettings.DashIsoGroupSettings.Destination =
            outputPath;
          break;
        case 'MS_SMOOTH_GROUP_SETTINGS':
          group.OutputGroupSettings.MsSmoothGroupSettings.Destination =
            outputPath;
          break;
        case 'CMAF_GROUP_SETTINGS':
          group.OutputGroupSettings.CmafGroupSettings.Destination = outputPath;
          break;
        default:
          throw Error(
            'OutputGroupSettings.Type is not a valid type. Please check your job settings file.'
          );
      }
    }

    if (!('AccelerationSettings' in job)) {
      job.AccelerationSettings = 'PREFERRED';
    }

    if (job.Queue && job.Queue.split('/').length > 1) {
      job.Queue = job.Queue.split('/')[1];
    }
  } catch (err) {
    console.log(err);
  }
  return job;
};

exports.createJob = async (job, endpoint) => {
  console.log('Creating Job...');

  const mediaConvert = new AWS.MediaConvert({ endpoint });

  try {
    await mediaConvert.createJob(job).promise();

    console.log('Job has submitted to MediaConvert.');
  } catch (err) {
    console.log(err);
  }
  return;
};
