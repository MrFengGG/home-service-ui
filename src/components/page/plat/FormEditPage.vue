<template>
    <fm-making-form 
        ref="makingform" 
        style="height: 100%;" 
        preview 
        generate-code 
        generate-json
    >
    <template slot="action">
    </template>
  </fm-making-form>
</template>
<script>
export default {
    name: 'FormEditPage'
}
</script>