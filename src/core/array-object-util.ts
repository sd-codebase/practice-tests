export class ArrayObjectUtil {
    public static removeObject(array, object) {
        const index = array.indexOf(object, 0);
        if (index > -1) {
            array.splice(index, 1);
        }
    }
}
