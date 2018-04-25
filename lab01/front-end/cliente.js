const listagem_view = document.getElementById('listagem');

const mensagens = [];
function update_view() {
	const initialTableContent = '<tr> <th>Título</th> <th>Mensagem</th> <th>Autor</th> <th>Criado em</th> </tr>'
    const items = mensagens.map(e => `<tr> <td>${e.title}</td> <td>${e.msg}</td> <td>${e.author}</td> <td>${e.created_at}</td> </tr>`).join("\n");
    listagem_view.innerHTML = '<table>' + initialTableContent + items + '</table>';
}

const backendURI = 'http://150.165.85.16:9900';

fetch(backendURI + '/api/msgs')
.then(r => r.json())
.then(data => {
    Object.assign(mensagens, data);
    update_view();
})

function submitMsgForm() {
	const formTitle = document.getElementById('cadastro_msg_title').value;
	const formAuthor = document.getElementById('cadastro_msg_autor').value;
	const formMsg = document.getElementById('cadastro_msg_mensagem').value;
	var mensagem = {
		title : formTitle, 
		author : formAuthor, 
		msg: formMsg,
		created_at: "Pending"
	};
	mensagens.push(mensagem);
	update_view();
	doPostRequestForBackend(mensagem)
	alert("Cadastramento de Mensagem Submetido" + "\n" + 
		"Título: " + mensagem.title + "\n" + 
		"Autor: " + mensagem.author + "\n" + 
		"Mensagem: " + mensagem.msg);
}

function doPostRequestForBackend(message) {
	// get user credentials to send in the HTTP POST
	fetch(backendURI + '/api/msgs', {
		method: "POST",
		body: message
	})
	.then(function (r) {
		if(r.status == 200 || r.status == 201) {
			alert("Criação da Mensagem\n" + JSON.stringify(message) + "\n Criada");
			r.json().then(data => {
				alert(JSON.stringify(data));
			});
		} else {
			alert("Criação da Mensagem\n" + JSON.stringify(message) + "\n Falhou");
		}
	})
}