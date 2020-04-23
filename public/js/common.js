//wraps functions in object to prevent global namespace pollution
const common = {
    formErrors: (messages, errorContainerId, effectedInputs) => {
        common.highlightInputs(effectedInputs, 'pink');
        common.displayMessages(errorContainerId, messages, '16px', 'red', 'bold');
    },
    clearFormErrors: (errorContainerId, inputs) => {
        $(errorContainerId).empty();
        common.highlightInputs(inputs, '');
    },
    highlightInputs: (inputs, color) => {
        inputs.forEach((input) => {
            $(input).css('background-color', color);
        });
    },
    displayMessages: (containerId, messages, textSize, color, weight) => {
        messages.forEach((message) => {
            $(containerId).append(
                `<div class="row mx-auto">
                <div class="col my-auto">
                    <p style="font-size:${textSize};color:${color};font-weight:${weight}">
                        ${message}
                    </p>
                </div>
            </div>`
            );
        });
    },
    setUpModalForm: (config, action) => {

        const modalDiv = $(config.ID);
        const toggleBtn = $(config.TOGGLE_BTN);
        const submitBtn = $(config.SUBMIT_BTN);
        const closeBtn = $(config.CLOSE_BTN);

        modalDiv.modal({backdrop: 'static', show: false});

        submitBtn.on('click', action);

        closeBtn.on('click', () => {
            common.resetForm(config.FORM, config.MSG_DISPLAY, Object.values(config.INPUT));
        });

        toggleBtn.on('click', () => {
            common.toggleModal(config.ID, true)
        });

    },
    resetForm: (id, errorDisplay, inputs) => {
        common.clearFormErrors(errorDisplay, inputs);
        $(id)[0].reset();
    },
    validEmail: (email) => {

        const crossSiteAttack = !xssFilters.inHTMLData(email);

        email = common.sanitize(email);

        const empty = validator.isEmpty(email,{ignore_whitespace:true});
        const valid = validator.isEmail(email,{ignore_whitespace:true});

        return !crossSiteAttack && !empty && valid;
    },
    validPassword: (password) => {

        const crossSiteAttack = !xssFilters.inHTMLData(password);

        password = common.sanitize(password);

        const empty = validator.isEmpty(password,{ignore_whitespace:true});
        const valid = validator.isAlphanumeric(password);

        return !crossSiteAttack && !empty && valid;
    },
    sanitize: (value) => {

        value = validator.escape(value);
        value = validator.trim(value);
        value = validator.stripLow(value);

        return value;
    },
    match: (value1, value2) => {
        return value1 === value2;
    },
    toggleModal: (id, show) => {
        if (show) {
            $(id).modal('show');
        } else {
            $(id).modal('hide');
        }
    },
    updateURIParam:(uri, key, value)=>{
        const reg = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
        const separator = uri.indexOf('?') !== -1 ? "&" : "?";
        if (uri.match(reg)) {
            return uri.replace(reg, '$1' + key + "=" + value + '$2');
        } else {
            return uri + separator + key + "=" + value;
        }
    },
    paginate:(pageNumber)=>{
        const page = common.updateURIParam(window.location.href, 'page', pageNumber);
        if(page !== window.location.href){
            window.location.href = page;
        }

    }
};