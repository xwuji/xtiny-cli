#! /usr/bin/env node
const program = require('commander');
const createProject = require('../generator/index.js');
program
  .name('xcli')
  .version('0.1.1')
  .description('Create a vue app/component or a lib project')
  .command('create <project-type> <project-name>')
  .option('--url <templateUrl>', 'template url github/gitlab/gitee')
  .option('-f,--force', 'force to create project,overwrite if exists')
  .option('-t,--ts', 'use typescript,default false')
  .option('-v,--vue <version>', 'vue version,default 2.x')
  .action((projectType = 'lib', projectName = 'xtiny-app', options) => {
    createProject({ projectType, projectName, options });
  });
program.parse();
