<template>
	<div class="data-1r12r">
		<label class="wrapper-post">
			<h2 class="title-post">Заголовок поста:</h2>
			<b-form-input v-model.lazy="title" type="text" name="title" placeholder=""></b-form-input>
		</label>
		<br>

		<h2>Тело поста:</h2>
		<vue-editor v-model="content" theme="show" class="editor"></vue-editor>

		<b-button @click="createPosts" variant="dark">submit</b-button>

	</div>
</template>

<script>
	import {quillEditor} from 'vue-quill-editor'
	import httpServices from "../../utils/httpService";
	import {VueEditor} from 'vue2-editor'

	export default {
		data() {
			return {
				content: '<p>example content</p>',
				title: '',


			}
		},
		components: {
			quillEditor,
			VueEditor
		},
		methods: {

			createPosts() {
				let data = {
					title: this.title,
					content: this.content
				};

				this.$store.dispatch('addPost', data).then(() => {
					this.title = '';
					this.content = '';
				});

			},


		},
		computed: {
			editor() {
				return this.$refs.myQuillEditor.quill
			}
		},
		mounted() {
			// console.log('this is current quill instance object', this.editor)
		}
	}
</script>


<style lang="scss">
	.editor{
		background-color: #ffffff;
		margin-bottom: 20px;
		transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
		will-change: box-shadow;
		box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);

	}
	.wrapper-post {
		display: flex;

		h2 {
			flex-shrink: 0;
			margin-right: 20px;
		}
	}

	.width500 {
		width: 100%;
		max-width: 900px;
	}

	.post-title {
		border: 2px solid #eee;
	}

	.ql-container {
		min-height: 150px;
	}
	.data-1r12r{
		padding: 20px 50px;
	}
</style>
