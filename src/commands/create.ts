
import { prompt, GluegunToolbox } from 'gluegun'

module.exports = {
  name: 'create',
  alias: ['c'],
  run: async (toolbox: GluegunToolbox) => {
    const {
      print: { info },
      template: { generate },
      system,
      parameters
    } = toolbox

    await system.run(`tvam doctor`)

    if (!parameters.first) {
      info('Informe o nome do projeto: e.g tvam create myApp')
      return
    }

    const projectName = parameters.first

    // 1. Select Tizen (Samsung) or Web OS (LG) or Both
    // 2. Select Vue.js, React or only Node.js or only Javascript
    // 3. Create Project

    const result = await prompt.ask([
      {
        type: 'select',
        name: 'platform',
        message: 'Which platform will you develop?',
        choices: ['Tizen (Samsung)', 'Web OS (LG)', 'Both'],
      },
      {
        type: 'select',
        name: 'jsFramework',
        message: 'Which framework will you use?',
        choices: ['Vue.js', 'React (In Roadmap)', 'Node.js (In Roadmap)', 'only Javascript (In Roadmap)'],
      }
    ])

    if (result.platform.includes('(In Roadmap)') || result.jsFramework.includes('(In Roadmap)')) {
      info("Eu falei que esta no Roadmap, vai lá tente outra vez tvam create")
      return
    }

    info(`Criando projeto ${result.platform} com ${result.jsFramework}`)

    let mkdir = `mkdir ${projectName}`
    await system.run(`${mkdir}`)

    generateVueJs(generate, projectName)

    let cdIn = `cd ${projectName}`

    if (result.platform == 'Tizen (Samsung)' || result.platform == 'Both') {
      let createTizen = 'tizen create web-project -n tizenProject -t BasicEmptyProject -p tv-samsung-5.0'
      await system.run(`${cdIn};${createTizen}`)
      prepareTizenProject(system, generate, projectName)
    }

    if (result.platform == 'Web OS (LG)' || result.platform == 'Both') {
      let createAres = 'ares-generate -p "id=com.example.sampleapp" aresProject'
      await system.run(`${cdIn};${createAres}`)
      prepareAresProject(system, generate, projectName)
    }

    info('Projeto criado')
    info('')
    info('Lembre se de sempre consultar as Docs')
    info('')
    info('Sinta se a vontade a usar o yarn ou npm como quiser')
    info('')
    info('Tizen: https://developer.tizen.org/')
    info('Vue.js: https://vuejs.org/')
    info('')
    info('webOS TV: http://webostv.developer.lge.com/')
    info('')
    info('Good Coding!!!')
  },
}

function generateVueJs(generate, projectName) {

  generate({
    template: 'vuejs/dist/index.html',
    target: `${projectName}/dist/index.html`
  })

  generate({
    template: 'vuejs/src/App.vue',
    target: `${projectName}/src/App.vue`
  })

  generate({
    template: 'vuejs/src/index.js',
    target: `${projectName}/src/index.js`
  })

  generate({
    template: 'vuejs/.gitignore',
    target: `${projectName}/.gitignore`
  })

  generate({
    template: 'vuejs/README.md',
    target: `${projectName}/README.md`
  })

  generate({
    template: 'vuejs/package.json',
    target: `${projectName}/package.json`
  })

  generate({
    template: 'vuejs/webpack.config.js',
    target: `${projectName}/webpack.config.js`
  })
}

function prepareTizenProject(system, generate, projectName) {

  // Remover index.html e main.js e pasta css
  let cdIn = `cd ${projectName}/tizenProject`
  let remove = 'rm -rf index.html main.js css'
  system.run(`${cdIn};${remove}`)

  // Modificar config.xml
  generate({
    template: 'tizen/config.xml',
    target: `${projectName}/tizenProject/config.xml`
  })

  // Add .gitignore
  generate({
    template: 'tizen/.gitignore',
    target: `${projectName}/tizenProject/.gitignore`
  })

}

function prepareAresProject(system, generate, projectName) {

  // Remover index.html e main.js e pasta css
  let cdIn = `cd ${projectName}/aresProject`
  let remove = 'rm -rf index.html main.js css'
  system.run(`${cdIn};${remove}`)

  // Modificar appinfo.json
  generate({
    template: 'ares/appinfo.json',
    target: `${projectName}/aresProject/appinfo.json`
  })

  // Add .gitignore
  generate({
    template: 'ares/.gitignore',
    target: `${projectName}/aresProject/.gitignore`
  })

}