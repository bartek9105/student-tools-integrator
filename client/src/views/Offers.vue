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
          <v-card>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="d-flex align-center">
                  <v-list-item-title class="mb-4">Three-line item</v-list-item-title>
                  <span class="caption">2020-06-06</span>
                </div>
                <v-list-item-subtitle>
                  Secondary line text Lorem ipsum dolor sit amet,
                  Secondary line text Lorem ipsum dolor sit amet,
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
  }
}
</script>

<style>

</style>
