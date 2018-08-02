function start() {
	// 设置一个数组用来存放对应参与人数据,不允许填充重复的人员
	var reportUserIdArray = [];

	if (nyData.data && nyData.data.member_info) {
		$.each(nyData.data.member_info, function (key, val) {
			reportUserIdArray.push(val.user_id);
		})
	}
	// 用来判断选中的参与人是否已经被选过了
	var isInArray = function (arr, targetArr) {
		// 存放未被选过的id
		var newIdArr = [];
		// 存放未被选过的数据
		var newItemArr = [];
		// 当前选择的人员是否有与原来的人员重复的
		var hasRename = false;
		$.each(arr, function (key, val) {
			if (targetArr.indexOf(val.userid) === -1) {
				newIdArr.push(val.userid);
				newItemArr.push(val);
			} else {
				// 当前选择的人员有与原来的人员重复,修改变量
				hasRename = true;
			}

		})
		return {
			newIdArr: newIdArr,
			newItemArr: newItemArr,
			hasRename: hasRename
		}
	}
	// 删除对应数组中的userid
	var deleteUserid = function(userid,targetArr){
		var index = targetArr.indexOf(userid);
		// 存在数组中时,将它删除出数组
		if(index !== -1){
			targetArr.splice(index,1);
		}
	}

	//初始化出生时间
	laydate.render({
		elem: $('#planTimeStart')[0],
		type: "date"
	});

	laydate.render({
		elem: $('#planTimeEnd')[0],
		type: "date"
	});


	//初始化部门选框
	var departmentSelect
	NY.post({
		url: "/user/department/getDepartmentList",
		isCoverSuccess: true,
		success: function (data) {
			if (data.status == "success") {
				departmentSelect = NY.component.initMulMarSelect({
					dom: "depSelectPop",
					title: "部门",
					rightTitle: "已选择部门",
					data: data.data,
					click: function (data) {}
				})
				if ($("#departmentIdInput").val()) {
					//初始化部门
					var depObj = departmentSelect.setSelect($("#departmentIdInput").val());
					if (depObj) {
						var marqueeArr = departmentSelect.getSeletItemArr();
						var postDataIdStr = departmentSelect.getSelectedItemIdArr().join(",");
						var postDataNameStr = "",
							postDataNameArr = [];
						$.each(marqueeArr, function (index, val) {
							postDataNameArr.push(val.name);
						})
						if (postDataNameArr.length) {
							postDataNameStr = postDataNameArr.join(",");
						}
						$("#departmentNameInput").val(postDataNameStr);
						$("#departmentIdInput").val(postDataIdStr);
					}
				}
				$("#departmentNameInput").click(function () {
					if ($("#departmentIdInput").val()) {
						//初始化部门
						departmentSelect.setSelect($("#departmentIdInput").val());
					}
					//初始化部门选择窗
					$M({
						title: '部门选择',
						padding: 0,
						width: '630px',
						//		    			height: '540px',
						top: '50%',
						lock: true,
						fixed: true,
						content: $("#depSelectPop")[0],
						ok: function () {
							var that = this;
							var marqueeArr = departmentSelect.getSeletItemArr();
							var postDataIdStr = departmentSelect.getSelectedItemIdArr().join(",");
							var postDataNameStr = "",
								postDataNameArr = [];
							$.each(marqueeArr, function (index, val) {
								postDataNameArr.push(val.name);
							})
							if (postDataNameArr.length) {
								postDataNameStr = postDataNameArr.join(",");
							}
							$("#departmentNameInput").val(postDataNameStr);
							$("#departmentIdInput").val(postDataIdStr);
							that.close();
						},
						okVal: '提交',
						cancel: false,
						cancelVal: '取消'
					})
				})
			} else {
				NY.error(data.message, 1.5);
			}
		}
	});
	// 初始化参与人选框
	var reportUserSelect, reportUserSelect2;
	NY.post({
		url: "/user/department/getdepartmentuserlist",
		isCoverSuccess: true,
		success: function (data) {
			if (data.status == "success") {

				reportUserSelect = new NY.component.initPeopleSelect({
					dom: "ccUserNameTp",
					title: "所有成员",
					data: data.data,
					oneCheck: true
				});
				reportUserSelect2 = new NY.component.initPeopleSelect({
					dom: "ccUserNameTp2",
					title: "所有成员",
					data: data.data
				});

				
			}
		},
		error: function () {
			NY.error("项目参与人设置组件初始化失败", 3)
		}
	})
	//初始化参与人表
	// 上移
	var $_contactsInfoTable = $("#contactsInfoTable");
	$_contactsInfoTable.on('click', ".participant-operate-btn.up", function () {
		var $_this = $(this),
			$_grandfather = $_this.parent().parent().parent(),
			$_prev = $_grandfather.prev();
		$_prev.before($_grandfather);
	});
	// 下移
	$_contactsInfoTable.on('click', ".participant-operate-btn.down", function () {
		var $_this = $(this),
			$_grandfather = $_this.parent().parent().parent(),
			$_next = $_grandfather.next();
		$_next.after($_grandfather);
	});
	// 删除
	$_contactsInfoTable.on('click', ".participant-operate-btn.delete", function () {
		var $_this = $(this),
			userid = $_this.data('userid'),
			$_grandfather = $_this.parent().parent().parent();
		$_grandfather.remove();
		// 删除对应人员id
		deleteUserid(userid,reportUserIdArray);
	});
	// 修改参与人
	$("body").on("click", ".realname", function () {
		var $_this = $(this);
		var $_idInput = $_this.siblings(".ny-input");
		$M({
			title: '选择成员',
			padding: 0,
			width: '620px',
			top: '50%',
			lock: true,
			fixed: true,
			content: $("#ccUserNameTp")[0],
			init: function () {
				var menberid = $_idInput.val()
				if (menberid !== "") {
					reportUserSelect.init([{
						userid: menberid
					}])
				} else {
					reportUserSelect.init([]);
				}

			},
			ok: function () {
				var reportUserArray = reportUserSelect.getSelected();
				var userName = [];
				var userId = [];
				$.each(reportUserArray, function (index, val) {
					userName.push(val.realname);
					userId.push(val.userid);
				});
				var hasRename = isInArray(reportUserArray,reportUserIdArray).hasRename
				if($_idInput.val()==reportUserArray.userid){
					hasRename=false;
				}
				if(hasRename){
					NY.warn('参与人不能重复',3)
				}else{
					deleteUserid($_idInput.val(),reportUserIdArray);
					$_this.val(userName.join(','));
					$_idInput.val(userId.join(','));
					this.close();
				}
				
			},
			okVal: '提交',
			cancel: false,
			cancelVal: '取消'
		});
	});
	// 添加参与人
	$(".participant-add-btn").click(function () {
		$M({
			title: '选择成员',
			padding: 0,
			width: '620px',
			top: '50%',
			lock: true,
			fixed: true,
			content: $("#ccUserNameTp2")[0],
			init: function () {
				reportUserSelect2.init([]);
			},
			ok: function () {
				var reportUserArray = reportUserSelect2.getSelected();
				var userName = [];
				var userId = [];
				$.each(reportUserArray, function (index, val) {
					userName.push(val.realname);
					userId.push(val.userid);
				});
				var obj = isInArray(reportUserArray,reportUserIdArray);
				// if(obj.hasRename){
				// 	NY.warn('重复选中的参与人将被忽略',2)
				// }
				// 删除对应人员id
				reportUserIdArray=reportUserIdArray.concat(obj.newIdArr);
				
				$_contactsInfoTable.find("tbody").append(template('contactsItemTp', {
					list: obj.newItemArr,
					nyData: nyData
				}));
				NY.component.initOaSelect("all");
				this.close();
			},
			okVal: '提交',
			cancel: false,
			cancelVal: '取消'
		});
		// $_contactsInfoTable.find("tbody").append($_contractInfoTrClone.clone(true));
	})

	// 初始化编辑器
	var RICH_TEXT;
	KindEditor.ready(function (K) {
		RICH_TEXT = initKindEditor("projectIntro", K);
	});
	var $_projectForm = $("#projectForm");
	$("#saveBtn").click(function () {
		//编辑器赋值
		RICH_TEXT.sync();
		var $_this = $(this);
		if (validate('projectForm')) {
			var infoNum = 0;
			$("#contactsInfoTable").find(".contacts-info-tr").each(function (key, val) {
				$(val).find(".member-info-input").each(function (key1, val1) {
					var name = 'member_info[' + infoNum + '][' + $(val1).data('name') + "]";
					$(val1).attr({
						"name": name
					});
					if ($(val1).data("name") == "sort") {
						$(val1).val(infoNum);
					}
				})
				infoNum++;
			})
			NY.post({
				url: $_projectForm.attr('action'),
				data: $_projectForm.serialize(),
				isShowWaitTip: true,
				isShowWaitMask: true
			})
		}

	})

}

let fs = require('fs');
let EventEmitter = require('events');
class ReadStream extends EventEmitter {
    constructor(path,options){
        super();
        this.path = path;
        this.highWaterMark = options.highWaterMark || 64*1024;
        this.start = options.start || 0;
        this.end = options.end || null;
        this.encoding = options.encoding || null;
        this.autoClose = options.autoClose === undefined ? true : options.autoClose

    }
    // this.on('newListener',()=>{
        
    // })
}