import { hashSync } from 'bcrypt';

export default function encryptField(field) {
    if (field) {
        return hashSync(field, 10);
    } else {
        throw 'Password field is required';
    }

}
