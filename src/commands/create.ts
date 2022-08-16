import { prompt, GluegunToolbox } from 'gluegun'

module.exports = {
  name: 'create',
  alias: ['c'],
  run: async (toolbox: GluegunToolbox) => {
    const {
      print: { info },
      template: { generate },
      system,
      filesystem,
      parameters
    } = toolbox

    let doctorResult = system.run(`tvam doctor`)

    doctorResult
      .then(result => {
        let countError = includesError(result)
        if (countError == 0) {
          runCommand(parameters, prompt, system, filesystem, info, generate)
            .then(() => console.log('done'))
            .catch(error => console.log(error))
        } else if (countError == 1) {
          info(result)
          runCommand(parameters, prompt, system, filesystem, info, generate)
            .then(() => console.log('done'))
            .catch(error => console.log(error))
        } else {
          info(result)
        }
      })
      .catch(() => {
        info('Erro ao executar doctor')
      })
  }
}

async function runCommand(
  parameters,
  prompt,
  system,
  filesystem,
  info,
  generate
) {
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
      choices: ['Tizen (Samsung)', 'Web OS (LG)', 'Both']
    },
    {
      type: 'select',
      name: 'jsFramework',
      message: 'Which framework will you use?',
      choices: [
        'Vue.js',
        'React (In Roadmap)',
        'Node.js (In Roadmap)',
        'only Javascript (In Roadmap)'
      ]
    }
  ])

  if (
    result.platform.includes('(In Roadmap)') ||
    result.jsFramework.includes('(In Roadmap)')
  ) {
    info('Eu falei que esta no Roadmap, vai lá tente outra vez tvam create')
    return
  }

  info(`Criando projeto ${result.platform} com ${result.jsFramework}`)

  let mkdir = `mkdir ${projectName}`
  await system.run(`${mkdir}`)

  generateVueJs(generate, projectName)

  if (result.platform === 'Tizen (Samsung)' || result.platform === 'Both') {
    let createTizen =
      'tizen create web-project -n tizenProject -t BasicEmptyProject -p tv-samsung-5.0'
    await system.run(`${createTizen}`)
    filesystem.move('tizenProject', `${projectName}/tizenProject`)
    prepareTizenProject(filesystem, generate, projectName)
  }

  if (result.platform === 'Web OS (LG)' || result.platform === 'Both') {
    let createAres = 'ares-generate -p "id=com.example.sampleapp" aresProject'
    await system.run(`${createAres}`)
    filesystem.move('aresProject', `${projectName}/aresProject`)
    prepareAresProject(filesystem, generate, projectName)
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
}

function includesError(str: String) {
  return (str.match(/não encontrado/g) || []).length
}

function generateVueJs(generate, projectName) {
  generate({
    template: 'vuejs/dist_bin/index.html',
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

function prepareTizenProject(filesystem, generate, projectName) {
  // Remover index.html e main.js e pasta css
  let platformPath = `${projectName}/tizenProject`
  filesystem.remove(`${platformPath}/index.html`)
  filesystem.remove(`${platformPath}/main.js`)
  filesystem.remove(`${platformPath}/css`)

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

function prepareAresProject(filesystem, generate, projectName) {
  // Remover index.html e main.js e pasta css
  let platformPath = `${projectName}/aresProject`
  filesystem.remove(`${platformPath}/index.html`)
  filesystem.remove(`${platformPath}/main.js`)
  filesystem.remove(`${platformPath}/css`)

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
