#! /usr/bin/env node
// 默认使用ts等一套标准规范模板，不需要配置
const ora = require('ora');
const figlet = require('figlet');
const path = require('path');
const fs = require('fs-extra');
const download = require('download-git-repo');
const defaultTemplateUrlList = {
  lib: 'https://github.com/xwuji/xtiny-jssdk-repo.git',
  app: 'https://github.com/xwuji/xtiny-jssdk-repo.git',
  mapps: 'https://github.com/xwuji/xtiny-mapps-repo.git',
  component: 'https://github.com/xwuji/xtiny-jssdk-repo.git'
};
async function createProject({ projectType, projectName, options }) {
  figlet('xtiny', function (err, data) {
    if (err) {
      console.log('Something Went Wrong...');
      console.dir(err);
      return;
    }
    console.log(data);
  });
  const {
    ts: useTyscript,
    vue: vueVersion,
    force: forceCreate,
    url: templateUrl
  } = options;
  const spinner = ora(`Generating ${projectType}`).start();
  // get current work dir
  const cwd = process.cwd();
  const createPath = path.join(cwd, projectName);
  // check if exists
  if (fs.existsSync(createPath)) {
    if (forceCreate) {
      await fs.remove(createPath);
    } else {
      spinner.fail(
        'The project already exists, please change the project name.'
      );
      return;
    }
  }
  let defaultTemplateUrl = defaultTemplateUrlList.lib;
  switch (projectType) {
    case 'lib':
      defaultTemplateUrl = defaultTemplateUrlList.lib;
      break;
    case 'app':
      defaultTemplateUrl = defaultTemplateUrlList.app;
      break;
    case 'mapps':
      defaultTemplateUrl = defaultTemplateUrlList.mapps;
      break;
    case 'component':
      defaultTemplateUrl = defaultTemplateUrlList.component;
      break;
  }
  const downloadUrl = templateUrl || defaultTemplateUrl;
  spinner.text = `Download Repo From ${downloadUrl}`;
  if (
    downloadUrl.indexOf('http://') < 0 &&
    downloadUrl.indexOf('https://') < 0
  ) {
    spinner.fail('The project templateUrl is not valid, please check.');
    return;
  }
  // downloadgit ts repo
  download(
    `direct:${templateUrl || defaultTemplateUrl}`,
    createPath,
    { clone: true },
    function (err) {
      if (err) {
        spinner.fail(`Generating Project Failed. ${err}`);
        spinner.stop();
      } else {
        spinner.succeed(
          `Generating your ${projectType} Project "${projectName}" Success.`
        );
        spinner.stop();
      }
    }
  );
}
module.exports = createProject;
