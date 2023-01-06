<template>
    <div id="content">
        <!-- <img src="assets/coffee_content.svg" alt=""> -->
        <div class="container py-3">
            <h1>Your Profile : Harum</h1>
               
            <div class="container">
                <div class="row">
                    <div class="col">
                        Update Your Profile
                    </div>
                </div>

                <img src="assets/logo_dasboard.png" class="rounded mx-auto d-block" alt="Image Profile">

                <div class="row mb-3 pt-lg-5">
                    <label for="colFormLabel" class="col-sm-2 col-form-label"><b>Outlet Name</b>*</label>
                    <div class="col-sm-10 pb-3">
                      <input type="name" class="form-control" id="colFormLabel" placeholder="Outlet name">
                    </div>
                    <label for="colFormLabel" class="col-sm-2 col-form-label"><b>Owner</b>*</label>
                    <div class="col-sm-10 pb-3">
                      <input type="name" class="form-control" id="colFormLabel" placeholder="Ouwner">
                    </div>
                    <label for="colFormLabel" class="col-sm-2 col-form-label"><b>Descrition</b>*</label>
                    <div class="col-sm-10 pb-3">                            
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                    <label for="colFormLabel" class="col-sm-2 col-form-label"><b>Upload Foto/Logo</b>*</label>
                    <div class="col-sm-10 pb-3">
                        <input class="form-control" type="file" id="formFile">
                    </div>
                </div>
                
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button class="btn btn-success" type="button"><i class="fa fa-save p-1"></i>Save</button>
                    <button class="btn btn-primary" type="button"><i class="fas fa-cut p-1"></i>Edit</button>
                    <button class="btn btn-secondary" type="button"><i class="fa fa-close p-1"></i>Back</button>
                </div>
                
            </div>
            
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
export default {
    props: {
        user: Object,
    },
    data() {
        return {
            roles: [],
            permissions: [],
            form_add: {
                form: {
                    name: ``,
                    permissions: [],
                },
                errors: {
                    name: [],
                    permissions: [],
                },
            },
            form_edit: {
                index: null,
                permissions: [],
                form: {
                    name: ``,
                    permissions: [],
                },
                errors: {
                    name: [],
                    permissions: [],
                },
            },
        }
    },
    methods: {
        async getPermissions() {
            await axios.get(`/permission`)
            .then(res => {
                if (res.data[`status`]) {
                    this.permissions = res.data[`data`];
                }
            })
        },
        getPermissionsForEdit() {
            let role = this.roles[this.form_edit.index];
            this.form_edit.permissions = this.permissions.slice();
            this.form_edit.permissions.forEach(perm => {
                perm.checked = false;
                role.permissions.forEach(perm2 => {
                    if (perm.id == perm2.id) perm.checked = true;
                })
            })
            
        },
        getRoles() {
            axios.get(`/role`)
            .then(res => {
                if (res.data[`status`]) {
                    this.roles = res.data[`body`];
                }
            })
        },
        openAddRole() {
            this.getPermissions();
            $(`#modalAddRole`).modal(`show`);
        },
        async openEditRole(index) {
            let role = this.roles[index];
            await this.getPermissions();
            this.form_edit.index = index;
            this.form_edit.form.name = role.name;
            $(`#modalEditRole`).modal(`show`);
            this.getPermissionsForEdit();
        },
        addRole() {
            axios.post(`/role`, this.form_add.form)
            .then(res => {
                if (res.data[`status`]) {
                    Swal.fire('BERHASIL!', res.data.message, 'success')
                    .then(() => {
                        $(`#modalAddRole`).modal(`hide`);
                        this.roles.push(res.data[`body`]);
                        this.form_add.form = {
                            name: ``,
                            permissions: [],
                        }
                    })
                }
            })
            .catch(err => {
                if (err.response) {
                    if (err.response.status != 400) {
                        Swal.fire('GAGAL', err.response.data.message, 'error')
                    }
                }
                let res = err.response;
                if (res) {
                    if (res.status == 400) {
                        for (const key in res.data[`body`]) {
                            if (Object.hasOwnProperty.call(res.data[`body`], key)) {
                                this.form_add.errors[key] = res.data[`body`][key];
                            }
                        }
                    }
                }
            })
        },
        updateRole() {
            let role = this.roles[this.form_edit.index];
            this.$refs.permissions.forEach(perm => {
                if (perm.checked) this.form_edit.form.permissions.push(perm.value);
            })
            axios.post(`/role/${role.id}`, this.form_edit.form)
            .then(res => {
                if (res.data[`status`]) {
                    Swal.fire('BERHASIL!', res.data.message, 'success')
                    .then(() => {
                        $(`#modalEditRole`).modal(`hide`);

                        this.roles[this.form_edit.index] = res.data['body'];
                        
                        this.form_edit.form = {
                            name: ``,
                            permissions: [],
                        }
                    })
                }
            })
            .catch(err => {
                if (err.response) {
                    if (err.response.status != 400) {
                        Swal.fire('GAGAL', err.response.data.message, 'error')
                    }
                }
                let res = err.response;
                if (res) {
                    if (res.status == 400) {
                        for (const key in res.data[`body`]) {
                            if (Object.hasOwnProperty.call(res.data[`body`], key)) {
                                this.form_add.errors[key] = res.data[`body`][key];
                            }
                        }
                    }
                }
            })
        },
        deleteRole(index) {
            let role = this.roles[index];
            Swal.fire({
                title: 'Apakah anda yakin ingin menghapus?',
                showDenyButton: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`/role/${role.id}`)
                    .then(res => {
                        let data = res.data;
                        if (data.status) {
                            Swal.fire('BERHASIL!', data.message, 'success')
                            .then(() => {
                                this.roles.splice(index, 1);
                            })
                        }
                    })
                }
            })
            .catch(err => {
                if (err.response) {
                    if (err.response.status != 400) {
                        Swal.fire('GAGAL', err.response.data.message, 'error')
                    }
                }
            })
        }
    },
    mounted() {
        this.getRoles();
    },
}
</script>