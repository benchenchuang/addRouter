<template>
    <div>
        <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="pass">
                <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="角色" prop="age">
                <el-input v-model.number="ruleForm.role" type="text"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import store from '@/vuex/index'
export default {
    name:'Login',
    data () {
        return {
             ruleForm: {
                name: '',
                password: '',
                role: ''
            },
        }
    },
    methods: {
        submitForm(formName) {
            store.dispatch('userLogin', this.ruleForm);
            console.log(this.ruleForm)
            this.$router.push('/home')
            // this.$refs[formName].validate((valid) => {
            //     if (valid) {
            //         store.dispatch('userLogin', this.ruleForm);
            //         this.$router.push('/home')
            //     } else {
            //         console.log('error submit!!');
            //         return false;
            //     }
            // });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>

