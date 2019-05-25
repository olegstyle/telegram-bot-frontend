export const getErrorsFromResponse = (response) => {
    if (typeof response === 'undefined') {
        return 'unknown error';
    }

    return getErrorsFromResponseData(response.data);
};

export const getErrorsFromResponseData = (response) => {
    const errors = {};
    for (const key in response.errors) {
        // noinspection JSUnfilteredForInLoop
        let error = response.errors[key];
        if (typeof error === 'object') {
            error = error[Object.keys(error)[0]];
        }

        // noinspection JSUnfilteredForInLoop
        errors[key] = error;
    }

    return errors;
};

export const getErrorTagFromResponseData = (response) => {
    return response.tag || undefined;
};

export const handleResponseErrorForComponent = (err, component) => {
    const errors = getErrorsFromResponse(err.response);
    if (typeof errors !== 'object') {
        component.setState({fails: {email: errors}});
        return;
    }
    if (!Object.keys(errors).length) {
        component.setState({
            fails: {
                email: getErrorTagFromResponseData(err.response.data),
                password: '',
            }
        });
        return;
    }

    component.setState({fails: errors});
};
