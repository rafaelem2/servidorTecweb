const axios = require("axios");
const options = {
  headers: {'Content-Type': "application/json", 'Accept':"application/json"}
}

function jacaWars(v, theta) {
  var g = 9.8;
  var rad = theta * Math.PI/180;
  var distancia = (Math.pow(v, 2) * Math.sin(2 * rad)) / g;
  if (distancia < 100 && distancia + 2 < 100) {
    return -1;
  }
  if (distancia > 100 && distancia - 2 > 100) {
    return 1;
  }
  if (distancia <= 102 || distancia >= 98) {
    return 0;
  }
}

function somaMaior(numeros){
  numeros.sort(function(x,y){return x-y}) //uso do stackoverflow para sort
  return (numeros[1] + numeros[numeros.length-2])
	
}

function anoBissexto(n) {
	if ((n % 4 == 0 && n % 100 != 0) || n % 400 == 0) {
		return true;
	}
	return false;
}


function primo(num) {
  for (var i = 2; i < num; i++)
    if (num % i === 0)
      return false;
  return num > 1;
}

//stackoverflow
function enesimo(n) {
  let cont = 0
  let i =0
  while (true) {
      if (primo(i) === true){
          cont++
      }
      if (cont === n) {
          return i;
      }
      i++
  };
}

function checkPalindrome(str) {     
  for(var i = 0; i < str.length / 2; i++) if (str[i] != str[str.length - i - 1]) return false;
  return true;
}

function contaPalindromo(str){
  let cont = 0
  for(var i = 0; i < str.length; i++) if (checkPalindrome(str[i]) === true) cont ++;
  return cont
}

function somaValores(objetos){
  var soma = 0;
  for (chave in objetos){
    soma += objetos[chave] 
  }

  return soma
}
function somaInts(string){
  const sumall = string.reduce((a, b) => Number(a) + Number(b)); //https://www.delftstack.com/howto/javascript/sum-array-of-objects-javascript/
  return(sumall);
}

axios({
  method: 'post',
  url: ' https://tecweb-js.insper-comp.com.br/token',
  data: {username: "rafaelem2"},
  options
}).then((res) =>{
    
    const options2 = {
      headers: {'Content-Type': "application/json", 'Accept':"application/json", 'Authorization': `Bearer ${res.data.accessToken}`}
    }

    axios.get('https://tecweb-js.insper-comp.com.br/exercicio', options2)
    .then((response)=>{
      const soma = response.data.soma.entrada.a + response.data.soma.entrada.b
      console.log(soma)
      axios.post('https://tecweb-js.insper-comp.com.br/exercicio/soma', {resposta:soma},options2);
      const tamanho = response.data['tamanho-string'].entrada.string.length
      console.log(tamanho)
      axios.post('https://tecweb-js.insper-comp.com.br/exercicio/tamanho-string', {resposta:tamanho},options2);
      const usuario = response.data['nome-do-usuario'].entrada.email.split("@")[0]
      console.log(usuario)
      axios.post('https://tecweb-js.insper-comp.com.br/exercicio/nome-do-usuario', {resposta:usuario},options2);
      const jw = jacaWars(response.data['jaca-wars'].entrada.v,response.data['jaca-wars'].entrada.theta)
      console.log(jw)
      axios.post('https://tecweb-js.insper-comp.com.br/exercicio/jaca-wars', {resposta:jw},options2);
      const bissexto = anoBissexto(response.data['ano-bissexto'].entrada.ano)
      console.log(bissexto)
      axios.post('https://tecweb-js.insper-comp.com.br/exercicio/ano-bissexto', {resposta:bissexto},options2);
      const volumePizza = Math.round(Math.PI * ((response.data['volume-da-pizza'].entrada.z)*(response.data['volume-da-pizza'].entrada.z)) * response.data['volume-da-pizza'].entrada.a);
      console.log(volumePizza)
      axios.post('https://tecweb-js.insper-comp.com.br/exercicio/volume-da-pizza', {resposta:volumePizza},options2);
      const mru = response.data.mru.entrada.s0 + response.data.mru.entrada.v * response.data.mru.entrada.t 
      console.log(mru)
      axios.post('https://tecweb-js.insper-comp.com.br/exercicio/mru', {resposta:mru},options2);
      const inverte = response.data['inverte-string'].entrada.string.split('').reverse().join('')
      console.log(response.data['inverte-string'].entrada.string)
      console.log(inverte)
      axios.post('https://tecweb-js.insper-comp.com.br/exercicio/inverte-string', {resposta:inverte},options2);
      const nPrimo = enesimo(response.data['n-esimo-primo'].entrada.n)
      console.log(nPrimo)
      console.log(response.data['n-esimo-primo'].entrada.n)
      axios.post('https://tecweb-js.insper-comp.com.br/exercicio/n-esimo-primo', {resposta:nPrimo},options2);
      const soma2 = somaMaior(response.data['soma-segundo-maior-e-menor-numeros'].entrada.numeros);
      console.log(soma2)
      axios.post('https://tecweb-js.insper-comp.com.br/exercicio/soma-segundo-maior-e-menor-numeros', {resposta:soma2},options2);
      const palindromo = contaPalindromo(response.data['conta-palindromos'].entrada.palavras)
      console.log(palindromo)
      axios.post('https://tecweb-js.insper-comp.com.br/exercicio/conta-palindromos', {resposta:palindromo},options2);
      const valores = somaValores(response.data['soma-valores'].entrada.objeto)
      axios.post('https://tecweb-js.insper-comp.com.br/exercicio/soma-valores', {resposta:valores},options2);
      const somaStrings = somaInts(response.data['soma-de-strings-de-ints'].entrada.strings)
      axios.post('https://tecweb-js.insper-comp.com.br/exercicio/soma-de-strings-de-ints', {resposta:somaStrings},options2);

    })
    

  });

