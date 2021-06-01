const fs = require("fs");
const path = require("path");

function lerDiretorio(caminho) {
  return new Promise((resolve, reject) => {
    try {
      let arquivos = fs.readdirSync(caminho);
      arquivos = arquivos.map((arquivo) => path.join(caminho, arquivo));
      resolve(arquivos);
    } catch (e) {
      reject(e);
    }
  });
}

function lerUnicoArquivo(caminho) {
    return new Promise((resolve, reject) => {
        try {
            const conteudo = fs.readFileSync(caminho, {encoding: 'utf8'});
            resolve(conteudo.toString())
        } catch (e) {
            reject(e);
        }
    })
}


function lerArquivos(caminhos) {
    return Promise.all(caminhos.map(caminho => lerUnicoArquivo(caminho)))
}

function elementosTerminadosCom(padraoTextual) {
  return function(array) {
    return array.filter((el) => el.endsWith(padraoTextual));
  }
  
}

function removerElementosSeVazio(array) {
    return array.filter(el => el.trim())
} 

function removerElementosSeIncluir(padraoTextual) {
    return function(array) {
       return array.filter(el => !el.includes(padraoTextual))
    }
    
}

function removerElementosSeApenasNumero(array) {
    return array.filter(el => {
      const numero = parseInt(el.trim())
      return numero !== numero
    })
}

// split serve para remover o elemento e o join unir com um espaco
function removerSimbolos(simbolos) {
    return function(array) {
      return array.map(el => {
          let novoTexto = el
          simbolos.forEach(simbolo => {
             novoTexto = novoTexto.split(simbolo).join('')
          })
      })
    }
}


module.exports = {
  lerDiretorio,
  elementosTerminadosCom,
  lerUnicoArquivo,
  lerArquivos,
  removerElementosSeVazio,
  removerElementosSeIncluir,
  removerElementosSeApenasNumero
};
