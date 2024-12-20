const TOKEN = '7672050971:AAGTYN8dqb_0CrFH3VclYhbZDflwwImtYCs';
const CHAT_ID = -'4516292888';
const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`

const form = document.getElementById('form');
const success = document.querySelector('.success');



form.addEventListener('submit', function(e) {
    e.preventDefault();

    /* дані при самовивозі */
    let message = 'Замовлення від ' + this.name.value + '\n' +
    'Телефон:' + this.tel.value + '\n'

    /* Додаткові дані при доставці */
    const streetInput = document.querySelector('input[name="street"]');
    const floorInput = document.querySelector('input[name="floor"]');
    const intercomInput = document.querySelector('input[name="intercom"]');

    if (streetInput && streetInput.value.trim()) {
        message += 'Вулиця, дім, квартира: ' + streetInput.value + '\n';
    }
    if (floorInput && floorInput.value.trim()) {
        message += 'Поверх: ' + floorInput.value + '\n';
    }
    if (intercomInput && intercomInput.value.trim()) {
        message += 'Домофон: ' + intercomInput.value + '\n';
    }


    /* додавання кінцевої ціни */
    const totalPrice = document.getElementById('final-cost__title').textContent;
    message += totalPrice;

    /* Виведення повідомлення в телеграм */
    if(this.name.value.trim() !== '' && this.tel.value.trim() !== '') {
        axios.post(URL_API, {
            chat_id: CHAT_ID,
            parse_mode: 'html',
            text: message
        })
            .then((res) => success.classList.remove('display'))
            .catch((err) => alert('Помилка у оформленні'))
            .finally(() => console.log('Код виконано'))
    } else {
        alert('Помилка у оформленні');
    }


});

