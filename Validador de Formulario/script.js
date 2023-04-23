let b7Validator = {
    handleSubmit: (event) => {
        event.preventDefault();

        let send = true;

        let inputs = form.querySelectorAll('input')

        b7Validator.clearErrors()

        for(let i=0; i<inputs.length; i++) {
            let input = inputs[i];
            let check = b7Validator.checkInput(input);
            if(check !== true) {
                send = false;
                b7Validator.showError(input, check)
            }
        }

        if(send) {
            form.submit()
        }
    },
    checkInput: (input) => {
        let rules = input.getAttribute('data-rules');
        if(rules !== null) {
            rules = rules.split('|')
            for(let k in rules) {
                let rDetails = rules[k].split('=');
                switch(rDetails[0]) {
                    case 'required':
                        if(input.value == ''){
                            return 'Campo obrigatorio'
                        }
                    break
                    case 'min':
                        if(input.value.length < rDetails[1]) {
                            return 'Campo precisa de no minimo ' + rDetails[1] + ' caracteres';
                        }
                    break
                    case 'email':
                        if(input.value != '') {
                            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if(!regex.test(input.value.toLowerCase())) {
                                return 'Email invalido'
                            }
                        }
                    break
                }
            }
        }
        return true;
    },
    showError: (input, error) => {
        input.style.borderColor = '#FF0000';

        let el = document.createElement('div');
        el.classList.add('error');
        el.innerHTML = error;

        input.parentElement.insertBefore(el, input.ElementSibling);
    },
    clearErrors: () => {
        let inputs = form.querySelectorAll('input');
        for(let i=0;i<inputs.length;i++) {
            inputs[i].style = ''
        }

        let els = document.querySelectorAll('.error');
        for(let i = 0; i<els.length; i++) {
            els[i].remove()
        }
    }
}

let form = document.querySelector('.b7validator')
form.addEventListener('submit', b7Validator.handleSubmit)