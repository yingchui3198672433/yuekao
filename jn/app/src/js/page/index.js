/*
 * @Author: ZXY 
 * @Date: 2019-01-21 09:49:00 
 * @Last Modified by: ZXY
 * @Last Modified time: 2019-01-21 11:02:46
 */
require(['./js/config.js'], function() {
    require(['jquery', 'bscroll', 'render'], function($, bscroll) {
        //初始化页面
        init();

        var scroll;

        function init() {
            //初始化滚动条
            initScroll();
            //初始化数据
            initData();
            //添加点击事件
            addEvent();
        }

        //添加点击事件
        function addEvent() {
            //点击搜索@按钮后，搜索到的结果
            $('.search').on('click', function() {
                var val = $('.text').val();
                //搜索关键字 进行分页整理
                $.ajax({
                    url: '/api/getlist',
                    data: {
                        title: val,
                        xl: val
                    },
                    dataType: 'json',
                    success: function(res) {
                        if (res.code == 1) {
                            renderlist(res.data)
                        } else {
                            alert(res.msg);
                        }
                    }
                });
            });


            //点击【表格】改变样式
            $('.th').on('click', function() {
                if ($('.shop').hasClass('current')) {
                    $('.shop').removeClass('current');
                    $('.th').html('表格');
                } else {
                    $('.shop').addClass('current');
                    $('.th').html('列表');
                }
            })
        };

        //初始化滚动条
        function initScroll() {
            scroll = new bscroll('.section', {
                probeType: 2,
                click: true
            });
            var scrollY,
                maxScrollY;
            scroll.on('scroll', function() {
                if ($(this).scrollY < -44) {
                    $('.section').attr('up', '放开刷新')
                } else if ($(this).scrollY < -22) {
                    $('.section').attr('up', '下拉加载')
                }
            });
            scroll.on('scrollEnd', function() {

            })
        }

        //初始化数据
        function initData() {
            $.ajax({
                url: '/api/getlist',
                dataType: 'json',
                // data: {
                //     limit: 10,
                //     pageSt: 1
                // },
                success: function(res) {
                    if (res.code == 1) {
                        renderlist(res.data);
                    } else {
                        alert(res.msg)
                    }
                }
            })
        }

        //渲染数据
        function renderlist(data) {
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
    })
})