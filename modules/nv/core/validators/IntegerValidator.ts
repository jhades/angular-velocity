export function integer(control) {
    if (!control.value.match(/^[0-9]*$/)){
        return {integer: true};
    }
}