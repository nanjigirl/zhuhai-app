/**
 * 字典管理
 */

var template = require('./dict.html');
var serviceHelper = require('services/serviceHelper.js');

module.exports = Vue.extend({
    template: template,
    data: function () {
        return {
            //树控件的数据（所有节点，整棵树的数据）
            treeData: [],
            //树控件配置
            defaultProps: {
                //数据的子项的属性名
                children: 'children',
                //数据的节点标注的属性名
                label: 'name'
            },
            //当前节点（最近一次点击的节点）
            currentNode: {},
            //当前节点数据
            currentData: {},
            //右侧表单标题
            formTitle: "-",
            //当前实体（与录入表单绑定的实体）
            currentEntity: {},
        }
    },
    mounted: function () {
        //刷新树的数据
        this.refreshTree();
    },
    methods: {
        //刷新树的数据
        refreshTree: function () {
            var formData = {};
            formData.token = serviceHelper.getToken();
            formData.r = Math.random();

            //到后台加载树节点数据，一次性从后台加载整棵树的数据，当数据量不大的情况下不做动态刷新节点
            $.ajax({
                type: "get",
                dataType: "json",
                url: serviceHelper.getBasicPath() + "/sysDict/getDictTree",
                data: formData,
                success: function (ajaxResult) {
                    if (ajaxResult) {
                        if (ajaxResult.success == true) {
                            var result = ajaxResult.data;
                            //获取到树节点数据并绑定，绑定数据后树控件界面即自动刷新
                            this.treeData = result;
                        } else {
                            //后台操作失败的代码
                            alert(ajaxResult.msg);
                        }
                    }
                }.bind(this)
            });
        },
        //节点点击事件
        nodeClick: function (data, node, tree) {
            //data是节点绑定的数据
            //node是节点对象，里面很多有用属性，具体自己看
            //tree是树控件

            //获取当前节点
            this.currentNode = node;
            //当前节点数据
            this.currentData = node.data;

            //点击节点后，右方的表单内容就刷新成点击节点的内容
            this.refreshForm();
        },
        //刷新编辑表单
        refreshForm: function () {
            //当前节点数据
            var currentData = this.currentData;

            this.formTitle = currentData.name;

            if (!(currentData.type)) {
                //传入空对象时，要把界面清空
                this.currentEntity = {};
            }
            else {
                //根节点不需要显示属性
                if (currentData.isRoot === true) {
                    this.currentEntity = {};
                    return;
                }

                if (currentData.isSave === false) {
                    //新节点（未保存过的）

                    this.currentEntity = {};
                    //从节点数据取出字段值（只需要获取新建节点时自动创建的字段）
                    this.currentEntity.text = currentData.text;
                    this.currentEntity.value = currentData.value;
                    this.currentEntity.type = currentData.type;
                    this.currentEntity.parentId = currentData.parentId;
                }
                else {
                    //已保存过的（从数据库加载的）节点

                    //根据id从后台获取该节点（行）所有字段的值，并赋值到界面
                    var formData = {};
                    formData.token = serviceHelper.getToken();
                    formData.r = Math.random();
                    formData.id = currentData.id;
                    //不同节点类型在后台保存用各自的url
                    var url = "/sysDict/get";

                    $.ajax({
                        type: "get",
                        dataType: "json",
                        url: serviceHelper.getBasicPath() + url,
                        data: formData,
                        success: function (ajaxResult) {
                            if (ajaxResult) {
                                if (ajaxResult.success === true) {
                                    var result = ajaxResult.data;

                                    this.currentEntity = result;
                                } else {
                                    //后台操作失败的代码
                                    alert(ajaxResult.msg);
                                }
                            }
                        }.bind(this)
                    });
                }
            }
        },
        //新增组（按钮点击事件）
        addGroup: function () {
            if (this.currentData.type != "group") {
                layer.msg("请选择组");
                return;
            }
            //新节点的父级节点要先保存，因为新节点需要父节点id
            if (this.currentData.isSave == false) {
                layer.msg("请先保存当前节点");
                return;
            }
            //添加组节点
            this.addGroupNode();
        },
        //添加组节点
        addGroupNode: function () {
            var dataNew = {};
            //新节点的默认名称
            dataNew.text = "新组";
            dataNew.value = "新组";
            dataNew.type = "group";

            this.setNewNodeProp(dataNew);
        },
        //添加字典（按钮点击事件）
        addDict: function () {
            //字典的父级必须是组
            if (this.currentData.type != "group") {
                layer.msg("请选择组");
                return;
            }

            //新节点的父级节点要先保存，因为新节点需要父节点id
            if (this.currentData.isSave == false) {
                layer.msg("请先保存当前节点");
                return;
            }
            //添加字典节点
            this.addDictNode();
        },
        //添加员工节点
        addDictNode: function () {
            var dataNew = {};
            //新节点的默认名称
            dataNew.text = "新字典";
            dataNew.value = "新字典";
            dataNew.type = "dict";

            this.setNewNodeProp(dataNew);
        },
        //添加字典项（按钮点击事件）
        addItem: function () {
            //字典项的父级必须是字典
            if (this.currentData.type != "dict") {
                layer.msg("请选择字典");
                return;
            }

            //新节点的父级节点要先保存，因为新节点需要父节点id
            if (this.currentData.isSave == false) {
                layer.msg("请先保存当前节点");
                return;
            }
            //添加字典节点
            this.addItemNode();
        },
        //添加字典项节点
        addItemNode: function () {
            var dataNew = {};
            //新节点的默认名称
            //新节点的默认名称
            dataNew.text = "新字典项";
            dataNew.value = "新字典项";
            dataNew.type = "item";

            this.setNewNodeProp(dataNew);
        },
        //设置新节点的属性
        setNewNodeProp: function (dataNew) {
            //根据节点的值获取节点名称
            dataNew.name = this.getNodeName(dataNew);
            //新节点要标记为未保存
            dataNew.isSave = false;
            dataNew.parentId = this.currentData.id;
            dataNew.children = [];
            //新节点添加到当前节点的子级
            this.currentData.children.push(dataNew);
        },
        //根据节点的值获取节点名称
        getNodeName: function (data) {
            return data.value + "（" + data.text + "）";
        },
        //保存（表单）
        save: function () {
            var currentData = this.currentData;

            //空节点（通过type是否有值判断）不能操作
            if (!(currentData.type)) return;
            //根节点不能操作
            if (currentData.isRoot == true) {
                layer.msg("根节点不能保存");
                return;
            }

            //复制当前实体（因为保存的表单对象不一定等于当前实体，防止污染当前实体，因此把复制一份作为保存对象）
            var formData = $.extend({}, this.currentEntity);
            formData.token = serviceHelper.getToken();
            formData.r = Math.random();

            $.ajax({
                type: "post",
                dataType: "json",
                url: serviceHelper.getBasicPath() + "/sysDict/save",
                data: formData,
                success: function (ajaxResult) {
                    if (ajaxResult) {
                        if (ajaxResult.success == true) {
                            var result = ajaxResult.data;

                            //保存成功后操作

                            //节点标记为已保存
                            currentData.isSave = true;
                            //更新id（未保存节点的id是0，保存后才是真实id）
                            currentData.id = result.id;
                            //更新name，节点在界面的值马上改变
                            currentData.text = result.text;
                            currentData.value = result.value;
                            currentData.name = this.getNodeName(currentData);
                        } else {
                            //后台操作失败的代码
                            alert(ajaxResult.msg);
                        }
                    }
                }.bind(this)
            });
        },
        //删除
        del: function () {
            var currentData = this.currentData;

            //空节点（通过type是否有值判断）不能操作
            if (!(currentData.type)) return;
            //根节点不能操作
            if (currentData.isRoot === true) {
                layer.msg("根节点不能删除");
                return;
            }

            //删除要先弹出确认框
            layer.confirm('确定删除记录？', {
                btn: ['确定', '取消']
            }, function (index) {
                //关闭弹窗
                layer.close(index);

                if (currentData.isSave === false) {
                    //没保存的直接删节点，不用进后台

                    //删除当前节点
                    //删除节点要从父节点删除，因此this.currentNode.parent是获取当前节点的父节点
                    this.currentNode.parent.removeChild(this.currentNode);
                    //清空当前选择节点
                    this.clearCurrentNode();
                }
                else {
                    //已保存的，要到后台删除数据库的数据

                    var formData = {};
                    formData.token = serviceHelper.getToken();
                    formData.r = Math.random();
                    formData.id = currentData.id;

                    $.ajax({
                        type: "get",
                        dataType: "json",
                        url: serviceHelper.getBasicPath() + "/sysDict/deleteEx",
                        data: formData,
                        success: function (ajaxResult) {
                            if (ajaxResult) {
                                if (ajaxResult.success === true) {
                                    var result = ajaxResult.data;

                                    //删除当前节点
                                    //删除节点要从父节点删除，因此this.currentNode.parent是获取当前节点的父节点
                                    this.currentNode.parent.removeChild(this.currentNode);
                                    //清空当前选择节点
                                    this.clearCurrentNode();
                                } else {
                                    //后台操作失败的代码
                                    alert(ajaxResult.msg);
                                }
                            }
                        }.bind(this)
                    });
                }
            }.bind(this), function () {

            });
        },
        //清空当前选择节点
        clearCurrentNode: function () {
            //以下对象都跟当前选择节点有关，都要清空
            this.currentNode = {};
            this.currentData = {};
            this.currentEntity = {};
        },
        //节点内容自定义渲染
        renderContent: function (createElement, {node, data, store}) {
            //根据节点类型使用不同的图标
            var iconClass;
            if (data.type === "group") {
                iconClass = "glyphicon-folder-open";
            }
            else if (data.type === "dict") {
                iconClass = "glyphicon-book";
            }
            else {
                iconClass = "glyphicon-bookmark";
            }

            //给节点添加自定义图标，这里用了节点自定义内容实现，理论上可以灵活性可以很大
            //官网例子是JSX语法，而这里改成使用普通的createElement，详细用户请看vue的Render函数
            return createElement("span", {}, [
                createElement("span", {}, [
                    //节点图标，使用glyphicon图标
                    createElement("span", {
                        attrs: {
                            class: "glyphicon " + iconClass,
                            style: 'margin-right: 5px'
                        }
                    }),
                    //节点文字
                    createElement("span", node.label)
                ])
            ])
        }
    }
});