<script>
import _isEmpty from 'lodash/isEmpty';
import _isPlainObject from 'lodash/isPlainObject';
export default {
    methods: {
        getNodePathByName(list, name) {
           return this.getPaths(list, (i) => i && i.name === name);
        },
        getPaths(list, predicate, path = '') {
            // 不是数组 就返回
            if (!Array.isArray(list)) {
                return path;
            }
            for (let i in list) {
                let res = predicate(list[i], list);
                if (res) {
                    path = path + '[' + i + ']';
                    return path;
                }
                if (!_isPlainObject(list[i])) {
                    continue;
                }
                let ks = Object.keys(list[i]);
                // console.log('list[' + i + '] = %o keys = %o', list[i], ks);
                for (let j in ks) {
                    let n = ks[j];
                    // console.log('list[' + i + '][' + n + '] = %o', list[i][n]);
                    if (Array.isArray(list[i][n])) {
                        let tempPath = this.getPaths(list[i][n], predicate);
                        if (!_isEmpty(tempPath)) {
                            path = path + '[' + i + '].' + n + tempPath;
                            return path;
                        }
                    } else {
                        let res = predicate(list[i][n], list[i]);
                        if (res) {
                            path = path + '[' + i + '].' + n;
                            return path;
                        }
                    }
                }
            }
            return path;
        }
    }
}

</script>
