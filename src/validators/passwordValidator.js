export class PasswordValidator {
    hasMinimumLength(password) {
        const regex = /.{8,}/;
        return regex.test(password);
    }

    hasUpperCase(password) {
        const regex = /[A-Z]/;
        return regex.test(password);
    }

    hasLowerCase(password) {
        const regex = /[a-z]/;
        return regex.test(password);
    }

    hasDigit(password) {
        const regex = /\d/;
        return regex.test(password);
    }

    hasSpecialCharacter(password) {
        const regex = /[@#$%^&+=]/;
        return regex.test(password);
    }

    // Validação completa com mensagens de erro
    validate(password) {
        const errors = [];

        if (!this.hasMinimumLength(password)) {
            errors.push("Senha deve ter pelo menos 8 caracteres.");
        }
        if (!this.hasUpperCase(password)) {
            errors.push("Senha deve conter uma letra maiúscula.");
        }
        if (!this.hasLowerCase(password)) {
            errors.push("Senha deve conter uma letra minúscula.");
        }
        if (!this.hasDigit(password)) {
            errors.push("Senha deve conter um número.");
        }
        if (!this.hasSpecialCharacter(password)) {
            errors.push("Senha deve conter um caractere especial.");
        }

        return errors;
    }
}