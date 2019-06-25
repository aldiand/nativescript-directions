<template>
  <Page class="page">
    <AppBar :title="'starter_review_text' | L"/>
    <ScrollView>
      <StackLayout>
        <StackLayout v-for="(item, name) in doctors" :key="name">
          <CardView class="card" margin="10" elevation="1" radius="1">
            <StackLayout class="list-comment">
              <Label :text="item.name" class="h4 text-main m-t-5"/>
              <Label :text="item.specialty" class="h5"/>
            </StackLayout>
          </CardView>
        </StackLayout>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<style scoped>
.star-review {
  width: 30px;
  margin: 0;
}
.list-comment {
  padding: 20px;
  margin-top: 20px;
}
</style>


<script>
export default {
  mounted() {
  },
  props: {
    doctors: Array,
  },
  data() {
    return {
      
    };
  },
  methods: {
    
  }
};
</script>