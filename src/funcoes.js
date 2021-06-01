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

function elementosTerminadosCom(array, padrao) {
  return array.filter((el) => el.endsWith(padrao));
}

function removerSeVazio(array) {
    return array.filter((el) => el.endsWith)
} 

module.exports = {
  lerDiretorio,
  elementosTerminadosCom,
  lerUnicoArquivo,
  lerArquivos,
};
