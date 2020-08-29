export default {
    getQueryStringByName(name) {
        let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        let r = window.location.search.substr(1).match(reg);
        let context = '';
        if (r != null) context = r[2];
        reg = null;
        r = null;
        context = decodeURI(context);
        return context === null || context === '' || context === 'undefined' ? '' : context;
    },
    // 截取字符串
    getStr(string,str){ 
        let str_before = string.split(str)[0]; 
        let str_after = string.split(str)[1]; 
        alert('前：'+ str_before +' - 后：'+str_after); 
    },
    formatDate: {
        format(date, pattern) {
            pattern = pattern || DEFAULT_PATTERN;
            return pattern.replace(SIGN_REGEXP, function($0) {
                switch ($0.charAt(0)) {
                case 'y':
                    return padding(date.getFullYear(), $0.length);
                case 'M':
                    return padding(date.getMonth() + 1, $0.length);
                case 'd':
                    return padding(date.getDate(), $0.length);
                case 'w':
                    return date.getDay() + 1;
                case 'h':
                    return padding(date.getHours(), $0.length);
                case 'm':
                    return padding(date.getMinutes(), $0.length);
                case 's':
                    return padding(date.getSeconds(), $0.length);
                }
            });
        },
        parse(dateString, pattern) {
            let matchs1 = pattern.match(SIGN_REGEXP);
            let matchs2 = dateString.match(/(\d)+/g);
            if (matchs1.length === matchs2.length) {
                let _date = new Date(1970, 0, 1);
                for (let i = 0; i < matchs1.length; i++) {
                    let _int = parseInt(matchs2[i]);
                    let sign = matchs1[i];
                    switch (sign.charAt(0)) {
                    case 'y':
                        _date.setFullYear(_int);
                        break;
                    case 'M':
                        _date.setMonth(_int - 1);
                        break;
                    case 'd':
                        _date.setDate(_int);
                        break;
                    case 'h':
                        _date.setHours(_int);
                        break;
                    case 'm':
                        _date.setMinutes(_int);
                        break;
                    case 's':
                        _date.setSeconds(_int);
                        break;
                    }
                }
                return _date;
            }
            return null;
        }
    },
    getUrlSearch() {
        let search;

        let items;

        let item;

        let name;

        let value;

        let args = {};
        search = location.search.length > 0 ? location.search.substring(1) : null;
        items = search ? search.split('&') : '';
        for (let i = 0, len = items.length; i < len; i++) {
            item = items[i].split('=');
            name = decodeURIComponent(item[0]);
            value = (item[1] || '').replace(/(.*)%$/, (match, $1) => {
                return $1 + encodeURIComponent('%');
            });
            value = decodeURIComponent(value || '');
            if (name.length > 0) {
                // 防止为空的参数比如说(?page=2&=invalidParam)
                args[name] = value;
            }
        }
        return args;
    },
    getPermUrl: function permUrl(menu = [], uris = []) {
        menu.forEach(menuItem => {
            let { meta = {} } = menuItem;
            if (meta.api) {
                meta.api.forEach(perm => {
                    uris.push(`${perm.project}::${perm.path}`);
                });
            }
            if (menuItem.children) {
                permUrl(menuItem.children, uris);
            }
        });
        return uris;
    },
    savePermApi(perms) {
        // localStorage.setItem(QU_LOCAL_PERMS, JSON.stringify(perms));
    },
    checkPermApi(map) {
        let localPerms = [];
        try {
            // localPerms = JSON.parse(localStorage.getItem(QU_LOCAL_PERMS)) || [];
        } catch (err) {}

        // console.log(localPerms,map)

        map.forEach(item => {
            if (item.children) {
                item.children.forEach(child => {
                    let apiList = child.meta.api || [];
                    let isHidden = true;
                    for (let i = 0, len = apiList.length; i < len; i++) {
                        let api = apiList[i];
                        let project = api.project;
                        let uri = api.path;
                        let key = project + '::' + uri;
                        if (localPerms[key] && localPerms[key].has === 1) {
                            isHidden = false;
                        } else {
                            isHidden = true;
                            break;
                        }
                        // console.log(key, isHidden);
                    }
                    child.meta.hidden = isHidden;
                });
            }
        });
        return map;
    },
    checkFileType(file) {
        let img = ['PNG', 'JPG'];
        let video = ['MP4'];
        let fileNameArr = file.split('.');
        if (img.includes(fileNameArr[fileNameArr.length - 1].toUpperCase())) {
            return 'img';
        } else if (video.includes(fileNameArr[fileNameArr.length - 1].toUpperCase())) {
            return 'video';
        }
    },
    download(url) {
        let iFrame = document.createElement('iframe');
        iFrame.src = url;
        iFrame.style.display = 'none';
        self.document.body.appendChild(iFrame);
    },
    isWx() {
        return /micromessenger/i.test(navigator.userAgent); // 是否是微信浏览器
    },
    getLoginUrl() {
        if (this.isWx()) {
            return '/m.html#/login';
        } else {
            return '/login';
        }
    },
    getQueryString(name) {
        let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        let r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return '';
    },
    debounce(func, wait = 50, immediate = true) {
        console.log(11, wait);
        let timer, context, args;

        // 延迟执行函数
        const later = () =>
            setTimeout(() => {
                // 延迟函数执行完毕，清空缓存的定时器序号
                timer = null;
                // 延迟执行的情况下，函数会在延迟函数中执行
                // 使用到之前缓存的参数和上下文
                if (!immediate) {
                    func.apply(context, args);
                    context = args = null;
                }
            }, wait);

        // 这里返回的函数是每次实际调用的函数
        return function(...params) {
            // 如果没有创建延迟执行函数（later），就创建一个
            if (!timer) {
                timer = later();
                // 如果是立即执行，调用函数
                // 否则缓存参数和调用上下文
                if (immediate) {
                    func.apply(this, params);
                } else {
                    context = this;
                    args = params;
                }
                // 如果已有延迟执行函数（later），调用的时候清除原来的并重新设定一个
                // 这样做延迟函数会重新计时
            } else {
                clearTimeout(timer);
                timer = later();
            }
        };
    },
    unique(arr) {
        let result = [arr[0]];
        for (let i = 1; i < arr.length; i++) {
            let repeat = false;
            for (let j = 0; j < result.length; j++) {
                if (arr[i] === result[j]) {
                    repeat = true;
                    break;
                }
            }
            if (!repeat) {
                result.push(arr[i]);
            }
        }
        return result;
    },
    setFavicon(url = 'static/qtt.ico') {
        let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'icon';
        link.href = url;
        document.getElementsByTagName('head')[0].appendChild(link);
    },
    waterMark
};