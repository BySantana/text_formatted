function formatarData(data) {
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('addTopic');
    const deleteButton = document.getElementById('deleteTopic');
    const generateButton = document.getElementById('generateOutput');
    const modalOutput = document.getElementById('modalOutput');
    const copyButton = document.getElementById('copyButton');

    const useCurrentDateCheckbox = document.getElementById('useCurrentDate');
    const dateInput = document.getElementById('dateInput');
    const dateInputLabel = document.getElementById('dateInputLabel');

    addButton.addEventListener('click', function () {
        const topicTextarea = document.createElement('textarea');
        topicTextarea.classList.add('form-control', 'topic-textarea', 'mb-3');
        topicTextarea.placeholder = 'Novo Tópico';

        document.getElementById('topics').appendChild(topicTextarea);
    });

    deleteButton.addEventListener('click', function () {
        const topicsContainer = document.getElementById('topics');
        const lastTopic = topicsContainer.lastChild;

        if (lastTopic && lastTopic.classList.contains('topic-textarea')) {
            topicsContainer.removeChild(lastTopic);
        }
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

        const topicTextareas = document.getElementsByClassName('topic-textarea');
        const topics = Array.from(topicTextareas).map((textarea, index) => {
            return `${index + 1}. ${textarea.value}`;
        });

        const formattedText = `*Ata da reunião, dia: ${formattedDate}*\n\n*Local*: ${casaInput}\n\n*Presentes*: ${presentsInput}\n\n*Tópicos:*\n\n${topics.join('\n\n')}`;

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