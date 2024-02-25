function formatarData(data) {
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

function addTopic() {
    const topicsContainer = document.getElementById('topics-container');

    const topicContainer = document.createElement('div');
    topicContainer.classList.add('topic-container',  'border-bottom');

    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.placeholder = 'Título do Tópico';
    titleInput.classList.add('form-control', 'topic-title', 'mb-3');

    const textarea = document.createElement('textarea');
    textarea.classList.add('form-control', 'topic-textarea', 'mb-3');
    textarea.placeholder = 'Digite seu tópico aqui...';

    const br = document.createElement('br');

    topicsContainer.appendChild(topicContainer);
    topicContainer.appendChild(br);
    topicContainer.appendChild(titleInput);
    topicContainer.appendChild(textarea);
    
    autosize(textarea);
}

function removeTopic() {
    const topicsContainer = document.getElementById('topics-container');
    const topicContainers = topicsContainer.getElementsByClassName('topic-container');

    if (topicContainers.length > 1) {
        topicsContainer.removeChild(topicContainers[topicContainers.length - 1]);
    }
}


document.addEventListener('DOMContentLoaded', function () {

    addTopic();

    const addButton = document.getElementById('addTopic');
    const deleteButton = document.getElementById('deleteTopic');
    const generateButton = document.getElementById('generateOutput');
    const modalOutput = document.getElementById('modalOutput');
    const copyButton = document.getElementById('copyButton');

    const useCurrentDateCheckbox = document.getElementById('useCurrentDate');
    const dateInputLabel = document.getElementById('dateInputLabel');

    addButton.addEventListener('click', function () {
        addTopic();
    });
    
    deleteButton.addEventListener('click', function () {
        removeTopic();
    });
    

    generateButton.addEventListener('click', function () {
        const casaInput = document.getElementById('casa').value;
        const presentsInput = document.getElementById('presents').value;
        const useCurrentDate = document.getElementById('useCurrentDate').checked;
        let dateInputValue = '';

        if (!useCurrentDate && document.getElementById('dateInput').value != '') {
            const dateInput = document.getElementById('dateInput').value;
            const [ano, mes, dia] = dateInput.split('-').map(Number);
            dateInputValue = new Date(ano, mes - 1, dia);
        }

        const currentDate = new Date();
        const formattedDate = useCurrentDate ? formatarData(currentDate) : formatarData(dateInputValue != '' ? dateInputValue : new Date());

        let formattedText = `*Ata da reunião, dia: ${formattedDate}*\n\n*Local*: ${casaInput}\n\n*Presentes*: ${presentsInput}\n\n*Tópicos:*`;

        const topicsContainer = document.getElementById('topics-container');
        const topicContainers = topicsContainer.getElementsByClassName('topic-container');    

        for (const topicContainer of topicContainers) {
            const titleInput = topicContainer.querySelector('.topic-title');
            const textarea = topicContainer.querySelector('.topic-textarea');
    
            const title = titleInput.value.trim();
            const topic = textarea.value.trim();
    
            if (title || topic) {
                formattedText += `\n\n${title != '' ? '*'+title+'*' + ':\n' : ''}${topic}`;
            }
        }

        modalOutput.value = formattedText;
    });

    useCurrentDateCheckbox.addEventListener('change', function () {
        dateInputLabel.hidden = useCurrentDateCheckbox.checked;

        dateInputLabel.classList.toggle('hidden', useCurrentDateCheckbox.checked);
    });

    copyButton.addEventListener('click', function () {
        modalOutput.select();
        document.execCommand('copy');
        alert('Texto copiado para a área de transferência');
    });
});