/**
 * 树控件高级demo
 */

var template = require('./alarmType.html');
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
                label: 'nameCn'
            },
            //当前节点（最近一次点击的节点）
            currentNode: {},
            //当前节点数据
            currentData: {},
            //右侧表单标题
            formTitle: "-",
            //公司表单是否显示（由于公司和员工表字段不同，因此分开写成两个表单，根据当前编辑的节点类型显示对应的表单）
            formCompanyShow: true,
            //当前实体公司（与录入表单绑定的实体）
            currentEntityAlarmType: {},
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
                url: serviceHelper.getBasicPath() + "/alarmType/getAlarmTypeTreeData",
                data: formData,
                success: function (ajaxResult) {
                    if (ajaxResult) {
                        if (ajaxResult.success == true) {
                            var result = ajaxResult.data;
                            //获取到树节点数据并绑定，绑定数据后树控件界面即自动刷新
                            this.treeData = result;
                            debugger;
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
            debugger;
            if (!(currentData.level)) {
                //传入空对象时，要把界面清空
                this.currentEntityAlarmType = {};
            }
            else {
                //根节点不需要显示属性
                if (currentData.isRoot == true) {
                    this.currentEntityAlarmType = {};
                    return;
                }

                if (currentData.isSave == false) {
                    //新节点（未保存过的）

                    this.currentEntityAlarmType = {};
                    //从节点数据取出字段值（只需要获取新建节点时自动创建的字段）
                    this.currentEntityAlarmType.name = currentData.name;
                    this.currentEntityAlarmType.nameCn = currentData.nameCn;
                    this.currentEntityAlarmType.level = currentData.level;
                    this.currentEntityAlarmType.parentName = currentData.parentName;

                } else {
                    //已保存过的（从数据库加载的）节点
                    //根据id从后台获取该节点（行）所有字段的值，并赋值到界面
                    var formData = {};
                    formData.token = serviceHelper.getToken();
                    formData.r = Math.random();
                    formData.id = currentData.id;
                    //不同节点类型在后台保存用各自的url
                    var url = "/alarmType/get";

                    debugger;
                    $.ajax({
                        type: "get",
                        dataType: "json",
                        url: serviceHelper.getBasicPath() + url,
                        data: formData,
                        success: function (ajaxResult) {
                            if (ajaxResult) {
                                if (ajaxResult.success == true) {
                                    var result = ajaxResult.data;
                                    //根据节点类型绑定到对应的实体对象
                                    this.currentEntityAlarmType = result;
                                    console.log(result);

                                } else {
                                    //后台操作失败的代码
                                    alert(ajaxResult.msg);
                                }
                            }
                            debugger;
                        }.bind(this)
                    });
                }
            }
        },
        //添加公司（按钮点击事件）
        addAlarmType: function () {

            //新节点的父级节点要先保存，因为新节点需要父节点id
            if (this.currentData.isSave == false) {
                alert("请先保存当前公司");
                return;
            }
            //添加公司节点
            this.addAlarmTypeNode();
        },
        //添加公司节点
        addAlarmTypeNode: function () {
            var dataNew = {};
            //新节点的默认名称
            dataNew.name = "new";
            dataNew.nameCn = "新预警";
            dataNew.level = "100";
            //新节点要标记为未保存
            dataNew.isSave = false;
            dataNew.parentName = this.currentData.name;
            dataNew.children = [];
            //新节点添加到当前节点的子级
            this.currentData.children.push(dataNew);
        },
        //添加员工（按钮点击事件）
        //保存（表单）
        save: function () {
            debugger;
            var currentData = this.currentData;

            //空节点（通过type是否有值判断）不能操作
            if (!(currentData.level)) return;
            //根节点不能操作
            if (currentData.isRoot == true) {
                alert("根节点不能保存");
                return;
            }

            //根据不同的节点类型获取对应的绑定到表单的实体对象
            var currentEntity = this.currentEntityAlarmType;
            //复制当前实体（因为保存的表单对象不一定等于当前实体，防止污染当前实体，因此把复制一份作为保存对象）
            var formData = $.extend({}, currentEntity);
            formData.token = serviceHelper.getToken();
            formData.r = Math.random();

            //不同节点类型在后台保存用各自的url
            var url = "/alarmType/saveTreeNode"

            debugger;
            $.ajax({
                type: "post",
                dataType: "json",
                url: serviceHelper.getBasicPath() + url,
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
                            currentData.name = result.name;
                            currentData.nameCn = result.nameCn;
                            currentData.level = result.level;
                            alert("保存成功");
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
            if (!(currentData.level)) return;
            //根节点不能操作
            if (currentData.isRoot == true) {
                alert("根节点不能删除");
                return;
            }

            //删除要先弹出确认框
            layer.confirm('确定删除记录？', {
                btn: ['确定', '取消']
            }, function (index) {
                //关闭弹窗
                layer.close(index);

                if (currentData.isSave == false) {
                    //没保存的直接删节点，不用进后台

                    //删除当前节点
                    //删除节点要从父节点删除，因此this.currentNode.parent是获取当前节点的父节点
                    this.currentNode.parent.removeChild(this.currentNode);
                    //清空当前选择节点
                    this.clearCurrentNode();
                } else {
                    //已保存的，要到后台删除数据库的数据

                    var formData = {};
                    formData.token = serviceHelper.getToken();
                    formData.r = Math.random();
                    formData.id = currentData.id;

                    //不同类型节点用对应的删除的url
                    var url = "/alarmType/deleteTreeNode";
                    debugger;
                    $.ajax({
                        type: "get",
                        dataType: "json",
                        url: serviceHelper.getBasicPath() + url,
                        data: formData,
                        success: function (ajaxResult) {
                            if (ajaxResult) {
                                if (ajaxResult.success == true) {
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
            this.currentEntityAlarmType = {};
        },
        //节点内容自定义渲染
        renderContent: function (createElement, {node, data, store}) {
            //根据节点类型使用不同的图标
            var iconClass = "glyphicon-briefcase";
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