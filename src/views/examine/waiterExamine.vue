<template>
  <div>
    <!-- 表格 -->
    <div class="tables">
      <el-table
        stripe
        :data="waiterData"
        style="width: 100%"
        height="calc(100vh - 220px)"
      >
        <el-table-column
          type="index"
          :index="indexMethod"
          label="编号"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="realname" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="telephone" label="手机号"> </el-table-column>
        <el-table-column prop="idCard" label="身份证号"> </el-table-column>
        <el-table-column prop="bankCard" label="银行卡号"> </el-table-column>
        <el-table-column prop="status" label="状态"> </el-table-column>

        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="toTest(scope.row)" type="text" size="small"
              >审核</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <div>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="queryParams.page"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="queryParams.pageSize"
          layout="total,sizes, prev, pager, next"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>

    <div>
      <el-dialog :title="title" :visible.sync="visible">
        <!-- ref 找到表单实例本身。。重置表单验证可用 -->
        用户名：<span>{{ form.username }}</span> <br />
        身份证号：<span>{{ form.idCard }}</span
        ><br />
        身份证正面：<span> <img :src="form.idcardPhotoPositive" alt="" /></span
        ><br />
        身份证反面：<span><img :src="form.idcardPhotoNegative" alt="" /></span>
        <br />
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="passTest">审核通过</el-button>
          <el-button type="danger" @click="rejectTest">审核拒绝</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// 导入vuex或者axios
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      queryParams: {
        page: 1,
        pageSize: 10,
        status: "",
      },
      ids: [],
      visible: false, //模态框显示隐藏
      formLabelWidth: "120px",
      title: "审核员工",
      form: {},
      //表单验证
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        realname: [
          { required: true, message: "请输入真实姓名", trigger: "blur" },
        ],
        telephone: [
          { required: true, message: "请输入电话号码", trigger: "blur" },
          { min: 11, max: 11, message: "长度11字符", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        idCard: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
        ],
        bankCard: [
          { required: true, message: "请输银行卡号", trigger: "blur" },
        ],
      },
      waiterId: null,
    };
  },
  computed: {
    ...mapGetters("waiter", ["total", "waiterData"]),
  },
  methods: {
    ...mapActions("waiter", [
      "findAll",
      "deleteById",
      "saveOrUpdate",
      "batchDelete",
      "refusauditing",
    ]),
    //分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.queryParams.pageSize = val;
      this.queryParams.page = 1;

      this.findAll(this.queryParams);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.queryParams.page = val;
      this.findAll(this.queryParams);
    },
    //自定义索引
    indexMethod(index) {
      return (
        (this.queryParams.page - 1) * this.queryParams.pageSize + index + 1
      );
    },
    //多选框
    handleSelectionChange(val) {
      //val是一个选中对象组成的数组
      // console.log(val);
      this.ids = val.map((item) => item.id); //批量删除的id数组
      if (this.ids.length > 0) {
        this.isDisable = false;
      } else {
        this.isDisable = true;
      }
    },

    //审核
    rejectTest(val) {
      this.refusauditing(this.waiterId).then(() => {
        this.$message({
          message: "已拒绝",
          type: "success",
        });
        this.findAll(this.queryParams);
      });
      this.visible = false;
    },
    passTest(val) {
      this.visible = false;
      this.$message("此功能仍在开发");
    },
    //编辑
    toTest(row) {
      this.form = { ...row };
      console.log(row);
      this.form.idcardPhotoNegative =
        "http://134.175.100.63:8686/" + this.form.idcardPhotoNegative;
      this.form.idcardPhotoPositive =
        "http://134.175.100.63:8686/" + this.form.idcardPhotoPositive;
      this.title = "员工审核";
      this.visible = true;
      this.waiterId = row.id;
    },
    //详情
    toDetail(row) {
      //路由跳转
      console.log(row);

      this.$router.push({
        path: `/waiterDetail/${row.id}/index`,
        query: {
          type: row.type,
        },
      });
    },
  },
  created() {
    this.findAll(this.queryParams);
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.options {
  overflow: hidden;
  & > * {
    float: left;
    margin-left: 10px;
  }
  & > div {
    width: 200px;
  }
}

.tables {
  margin: 30px 0;
}
</style>