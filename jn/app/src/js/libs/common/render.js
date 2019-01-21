define(['jquery'], ['render'], function($) {
    return function(data) {
        var str = '';
        data.map(function(v) {
            str += `
            <li>
                <dl>
                    <dt><img src="${v.url}" alt=""></dt>
                    <dd>
                        <div class="title">
                            <p>${v.title}</p>
                        </div>
                        <div class="js">
                            <p><span class='price'>￥${v.price}</span> <span class='xl'>${v.cont}万人付款</span><span class='place'>${v.place}</span></p>
                            <p>杜凡化妆专营店<span class='suc'>进店&gt;</span></p>
                        </div>
                    </dd>
                </dl>
            </li> `
        });
        $('.shop').html(str);
    }
});