<template>
  <div>
    <toolbar titulo="Emissão Pedidos"></toolbar><br>

    <div class="tamanhoPagina">
      <p>Cliente</p>
      <div class="control ">
        <div class="select is-dark is-fullwidth">
          <select class="" v-model="name" name="name">
            <option v-for="value in this.nomes" :value="(value._links.self.href).slice(-1)" :key="(value._links.self.href).slice(-1)">{{ value.nome }}</option>
          </select>
        </div>
      </div>
    </div><br>

    <div class="tamanhoPagina is-pulled-right">
      <button class="button is-dark is-small" @click="incluirPedido">Incluir</button>
    </div><br><br>

    <modal v-show="isModalVisible" @close="closeModal" :idPedido="this.numeroPedido"/>
  </div>
</template>

<script>
import toolbar from '../components/toolbar.vue';
import modal from '../components/modal.vue';

export default {
  components: {
    'toolbar': toolbar,
    'modal': modal,
  },
  data() {
    return {
      isModalVisible: false,
      name: null,
      nomes: [],
      numeroPedido: null,
    };
  },
  created() {
    this.$http.get('https://emissaopedido.herokuapp.com/clientes')
      .then(res => res.json())
      .then(data => this.nomes = data._embedded.clientes);
  },
  methods: {
    incluirPedido() {
      if (!this.name) {
        alert("Favor escolher cliente");
        return;
      }
      let queryJson = this.montaJson();
      this.$http.post('https://emissaopedido.herokuapp.com/pedidos', queryJson)
        .then((response) =>{
            this.numeroPedido = Number(/[^/]*$/.exec(response.body._links.pedido.href)[0]);
        });
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    montaJson() {
      return `{
        "cliente":"cliente/${this.name}"
      }`;
    }
  }
}
</script>

<style>
  .tamanhoPagina {
    margin-left: 20%;
    margin-right: 20%;
  }
</style>
