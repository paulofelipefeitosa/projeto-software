const listagem_view = document.getElementById('table_body');
const mensagens = [];
const backendURI = 'http://150.165.85.16:9900';

getMsgs();

function update_view() {
    const items = mensagens.map(e => `<tr> <td> <input type="checkbox" name="message_checkbox" value="${e.id}">
																			</td> <td>${e.title}</td> <td>${e.msg}</td> <td>${e.author}</td>
																			<td>${e.created_at}</td> </tr>`).join("\n");
    listagem_view.innerHTML = items;
}

function submitMsg() {
	const formTitle = document.getElementById('cadastro_msg_title').value;
	const formAuthor = document.getElementById('cadastro_msg_autor').value;
	const formMsg = document.getElementById('cadastro_msg_mensagem').value;
	const formUserId = document.getElementById('cadastro_authentication_id').value;
	const formUserPassword = document.getElementById('cadastro_authentication_password').value;
	const credential = formUserId + ":" + formUserPassword;
	const mensagem = {
		title: formTitle,
		author: formAuthor,
		msg: formMsg,
		created_at: "Pending",
		credentials: credential
	};

	mensagens.push(mensagem);
	update_view();

	fetch(backendURI + '/api/msgs', {
		method: "POST",
		body: JSON.stringify(mensagem)
	})
	.then(function (r) {
		if(r.status == 200 || r.status == 201) {
			getMsgs();
		} else {
			messageIndex = mensagens.indexOf(mensagem);
			mensagens.splice(messageIndex, 1);
			mensagem.created_at = "Error: " + r.status;
			mensagens.push(mensagem);
			update_view();
		}
	})
}

function getMsgs() {
	fetch(backendURI + '/api/msgs')
	.then(r => r.json())
	.then(data => {
	    Object.assign(mensagens, data);
	    update_view();
	})
}

function deleteMsgs() {
	checkboxes = document.getElementsByName('message_checkbox');
	const formUserId = document.getElementById('remocao_authentication_id').value;
	const formUserPassword = document.getElementById('remocao_authentication_password').value;
	const credential = formUserId + ":" + formUserPassword;
	body_message = {
		credentials: credential
	}

	for(var i = 0, n = checkboxes.length; i < n; i++) {
		if(checkboxes[i].checked) {
			messageId = checkboxes[i].value;
			message = getMessageById(messageId);

			if(message.frontend == formUserId) {
				fetch(backendURI + '/api/msgs/' + message.id, {
					method: "DELETE",
					body: JSON.stringify(body_message)
				}).then(function (r) {
					messageIndex = mensagens.indexOf(message);
					mensagens.splice(messageIndex, 1);
					if(r.status == 200) {
						message.created_at = "Deleted";
					} else {
						message.created_at = "Error in Delete: " + r.status;
					}
					mensagens.push(message);
					update_view();
				})
			}
		}
  }
}

function getMessageById(messageId) {
	for(var i = 0, n = mensagens.length; i < n; i++) {
		if(messageId == mensagens[i].id) {
			return mensagens[i];
		}
	}
}
