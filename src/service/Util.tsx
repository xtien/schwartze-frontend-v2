class Util {

    isNotEmpty(string) {

        return string != null && string.length > 0;
    }

    isEmpty(string: string | any[] | null) {
        return string == null || string.length === 0;
    }
}

export default new Util()
