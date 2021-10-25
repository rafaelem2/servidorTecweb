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

function anoBissexto(n) {
	if ((n % 4 == 0 && n % 100 != 0) || n % 400 == 0) {
		return true;
	}
	return false;
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
      const tamanho = response.data['tamanho-string'].entrada.string.length
      console.log(tamanho)
      const usuario = response.data['nome-do-usuario'].entrada.email.split("@")[0]
      console.log(usuario)
      const jw = jacaWars(response.data['jaca-wars'].entrada.v,response.data['jaca-wars'].entrada.theta)
      console.log(jw)
      const bissexto = anoBissexto(response.data['ano-bissexto'].entrada.ano)
      console.log(bissexto)
      const volumePizza = Math.round(Math.PI * ((response.data['volume-da-pizza'].entrada.z)^2) * response.data['volume-da-pizza'].entrada.a);
      console.log(volumePizza)
    })
    

  });

