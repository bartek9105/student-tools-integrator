<template>
  <v-container>
    <Breadcrumbs/>
    <v-form>
      <v-row>
        <v-col cols="12" sm="12" md="6">
          <v-text-field
            label="Topic"
            filled
          ></v-text-field>
          <v-textarea
            filled
            name="input-7-4"
            label="Offer description"
          ></v-textarea>
          <v-text-field
            label="Phone number or e-mail"
            filled
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="12" md="6">
          <h3 class="mb-8">Offers list</h3>
          <v-card v-for="offer in getOffers" :key="offer._id">
            <v-list-item three-line>
              <v-list-item-content>
                <div class="d-flex align-center">
                  <v-list-item-title class="mb-4">{{ offer.title }}</v-list-item-title>
                  <span class="caption">{{ offer.createdAt.substr(0, 10) }}</span>
                </div>
                <v-list-item-subtitle class="mb-4">
                  {{ offer.description }}
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  554 112 332
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
      <v-btn color="primary">
        Add offer
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
import Breadcrumbs from '@/components/Breadcrumbs'

export default {
  components: {
    Breadcrumbs
  },
  methods: {
    fetchOffers () {
      this.$store.dispatch('fetchOffers')
    }
  },
  computed: {
    getOffers () {
      return this.$store.getters.getOffers
    }
  },
  mounted () {
    this.fetchOffers()
  }
}
</script>

<style>

</style>
