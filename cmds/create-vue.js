const inquirer = require('inquirer');
const { exec } = require('child_process')
const fs = require('fs');
module.exports = () => {
    var answersRes = []
    inquirer.prompt([
        {
            type: 'confirm',
            name: 'vue-router',
            message: 'Do you want to use vue-router?',
            default: true
        },
        {
            type: 'confirm',
            name: 'httpUtils',
            message: 'Do you want to use httpUtils(axios or vue-resource)?',
            default: true
        }
    ]).then(answers => {
        if (answers['vue-router']) {
            answersRes.push('vue-router')
        }

        if (answers['httpUtils']) {
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'util',
                    message: 'Which tool do you want to use?',
                    choices: [
                    'vue-resource',
                    'axios'
                    ]
                }
            ]).then(ans => {
                answersRes['httpUtils'] = ans['util']
                
                if (answersRes['httpUtils']) {
                    answersRes.push(answersRes['httpUtils']);
                }

                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'packageManager',
                        message: 'which package manager do you want to use?',
                        choices: [
                            'npm',
                            'cnpm',
                            'yarn'
                        ]
                    }
                ]).then(res => {
                    // make folder
                    createFolder(answersRes)
                    // install package
                    // installPack(answersRes)
                })

                console.log(answersRes)
            })
        }
    })
}

function installPack(answersRes){
    var installPackageStr = answersRes.join(' ');
    var execstr = ''
    if (res['packageManager'] == 'yarn') {
        execstr = `yarn add ${installPackageStr} --save`
    } else {
        execstr = `${res['packageManager']} i ${installPackageStr} --save`
    }
    // package install
    console.log(execstr)
    exec(execstr)
}

// 创建 vue 相关的项目文件
function createFolder (useranser) {
    var folderarr = [
        'assets',
        'components',
    ]
    if (useranser.includes('vue-router')) {
        folderarr.push('router')
    }
    var needfolderstr = folderarr.join(' ') 
    folderarr.forEach((item,index) => {
        fs.exists(`src/${item}`,function (exists) {
            if (!exists) {
                fs.mkdir(`src/${item}`,function (err) {
                    if (err) console.log(err)
                })
            }
        })   
    })
    writefile()
}

function writefile() {
    // components
    // main str
    var mainstr = `
    import Vue from 'vue'
    import App from './App'
    Vue.config.productionTip = false

    new Vue({
        el: '#root',
        components: { App },
        template: '<App/>'
    })
    `;
    var appstr = `
<template>
    <div id="app">
        app vue
    </div>
</template>

<script>
    export default {
    name: 'App'
    }
</script>

<style>
    #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    }
</style>
    `
    
    fs.writeFile(__dirname + '/src/main.js',mainstr,null,function (err) {
        err && console.log(err)
    })

    
    fs.writeFile(__dirname + '/src/App.vue',appstr,null,function (err) {
        err && console.log(err)
    })
}