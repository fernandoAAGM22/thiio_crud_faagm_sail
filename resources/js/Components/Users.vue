<script setup lang="ts">
import { ref, reactive, computed, watch, nextTick, onMounted } from 'vue'
import { trans } from 'laravel-vue-i18n'
import axios from 'axios'

const itemsPerPage = ref<number>(5);
const serverItems = ref<any[]>([])
const loading = ref(true)
const totalItems = ref(0)

async function loadItems({ page, itemsPerPage, sortBy }) {
    loading.value = true;
    try {
        const response = await axios.get('/api/users/read');
        if (response.data) {
            let items = response.data.slice();
            if (sortBy.length) {
                const sortKey = sortBy[0].key;
                const sortOrder = sortBy[0].order;
                items.sort((a, b) => {
                    const aValue = a[sortKey];
                    const bValue = b[sortKey];
                    return sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
                });
            }
            const start = (page - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            const paginated = items.slice(start, end);
            serverItems.value = paginated;
            totalItems.value = items.length;
        } else {
            console.error('Failed to load users');
            serverItems.value = [];
            totalItems.value = 0;
        }
    } catch (error) {
        console.error('Error loading users:', error);
        serverItems.value = [];
        totalItems.value = 0;
    } finally {
        loading.value = false;
    }
}

const dialog = ref(false)
const dialogDelete = ref(false)
const headers = [
    { title: trans('id'), key: 'id' },
    { title: trans('name'), key: 'name' },
    { title: trans('email'), key: 'email' },
    { title: trans('password'), key: 'password' },
    { title: trans('actions'), key: 'actions', sortable: false }
]

const editedIndex = ref(-1)
const editedItem = ref<any>({})
const password = ref<string>('')

const formTitle = computed(() => (editedIndex.value === -1 ? trans('new_user') : trans('edit_user')))

watch(dialog, (val) => {
    if (!val) close()
})
watch(dialogDelete, (val) => {
    if (!val) closeDelete()
})

function editItem(item: any) {
    editedIndex.value = serverItems.value.indexOf(item)
    editedItem.value = { ...item }
    password.value = ''
    dialog.value = true
}

function deleteItem(item: any) {
    editedIndex.value = serverItems.value.indexOf(item)
    editedItem.value = { ...item }
    dialogDelete.value = true
}

function close() {
    dialog.value = false
    nextTick(() => {
        loadItems({ page: 1, itemsPerPage: itemsPerPage.value, sortBy: [{ key: 'name', order: 'asc' }] });
    })
}

function closeDelete() {
    dialogDelete.value = false
    nextTick(() => {
        loadItems({ page: 1, itemsPerPage: itemsPerPage.value, sortBy: [{ key: 'name', order: 'asc' }] });
    })
}

function save() {
    const userData = {
        name: editedItem.value.name,
        email: editedItem.value.email,
        password: password.value || undefined, // Only include password if it is set
    };

    const request = editedIndex.value === -1
        ? axios.post('/api/users/create', userData)
        : axios.post('/api/users/update', { id: editedItem.value.id, ...userData });

    request.then((response: any) => {
        close()
    }).catch((error: any) => {
        console.error('Error saving user:', error);
    });
}

function deleteItemConfirm() {
    axios.post('/api/users/delete', { id: editedItem.value.id })
        .then((response: any) => {
            closeDelete()
        })
        .catch((error: any) => {
            console.error('Error deleting user:', error);
        });
}
</script>

<template>
    <v-data-table-server v-model:items-per-page="itemsPerPage" :headers="headers" :items="serverItems"
        :items-length="totalItems" :loading="loading" item-value="name" @update:options="loadItems"
        :sort-by="[{ key: 'name', order: 'asc' }]">
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>{{ $t('users_title') }}</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ props }">
                        <v-btn dusk="add_user" class="mb-2" color="primary" dark v-bind="props" @click="editItem({})">
                            {{ $t('add_user') }}
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="text-h5">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" md="12" sm="12">
                                        <v-text-field dusk="name" v-model="editedItem.name" :label="`${$t('name')}`"
                                            class="!tw-text-black !tw-bg-white"/>
                                    </v-col>
                                    <v-col cols="12" md="12" sm="12">
                                        <v-text-field dusk="email" v-model="editedItem.email" :label="`${$t('email')}`"
                                            class="!tw-text-black !tw-bg-white" />
                                    </v-col>
                                    <v-col cols="12" md="12" sm="12">
                                        <v-text-field dusk="password" v-model="password" :label="`${$t('password')}`" type="password"
                                            class="!tw-text-black !tw-bg-white" />
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue-darken-1" variant="text" @click="close">
                                {{ $t('cancel') }}
                            </v-btn>
                            <v-btn dusk="submit_add_user" color="blue-darken-1" variant="text" @click="save">
                                {{ $t('save') }}
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                        <v-card-title class="text-h5">{{ $t('confirm_delete') }}</v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue-darken-1" variant="text" @click="closeDelete">{{ $t('cancel') }}</v-btn>
                            <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">{{ $t('ok')
                                }}</v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
            <v-icon class="me-2" size="small" @click="editItem(item)">
                mdi-pencil
            </v-icon>
            <v-icon size="small" @click="deleteItem(item)">
                mdi-delete
            </v-icon>
        </template>
    </v-data-table-server>
</template>
