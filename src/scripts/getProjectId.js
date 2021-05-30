/*
CURL:

curl \
    -H "Accept: application/vnd.github.v3+json" \
    https://api.github.com/repos/gagocarrilloedgar/HTSV2
*/

// Functional code since ES6 or later
import axios from 'axios';

const getProjectId = async () => {
    const { id } = await axios.get('https://api.github.com/repos/gagocarrilloedgar/HTSV2');

    return id;
}