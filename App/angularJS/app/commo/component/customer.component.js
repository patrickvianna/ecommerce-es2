
angular.module('myApp')
.component('customerModal', {
    template: `<div class="modal-header">
    <button type="button" ng-click="$ctrl.handleDismiss()" class="close" data-dismiss="modal" aria-label="Close">
      <span aria-hidden="true">×</span></button>
    <h2 class="modal-title">Buscar cliente</h2>
  </div>
<!-- HEADER -->

<div class="jumbotron margem-detail">
    <!--button type="button" class="close" data-dismiss="modal" aria-label="Close">
    <span aria-hidden="true">×</span></button-->
    <div class="modal-body">

    <h2>Cliente</h2>
        <form class="form-inline" ng-submit="$ctrl.searchCustomer()">
            <div class="form-group">
                <div class="row">
                    <div class="col-md-4">
                        <label class="sr-only" for="inlineFormInputGroup">ID</label>
                        <input type="text" ng-model="$ctrl.Filter.id" class="form-control" placeholder="ID"/>
                    </div>
                    <div class="col-md-4">
                        <label class="sr-only" for="inlineFormInputGroup">NOME</label>
                        <input type="text" ng-model="$ctrl.Filter.name" class="form-control" placeholder="Nome"/>
                    </div>
                    
                    <div class="col-md-4">
                        <button class="btn btn-small btn-primary" >Buscar</button>
                    </div>
                </div>           
            </div>
        </form>
        
        <table class="table" ng-show="$ctrl.lista.value.length > 0">
            <thead class="thead-light">
                <tr>
                    <th >ID</a></th>
                    <th>Nome</a></th>
                </tr>
            </thead>
            <tbody>
                <tr ng-repeat="item in $ctrl.lista.value track by $index"> <!-- | filter: {titulo: criterioDeBusca} | filter: {status: selectedStatus} -->
                    <td>{{item.id}}</td>
                    <td>{{item.name}}</td>
                                        
                    <td><a ng-click="$ctrl.handleClose(item.id, item.name)" class="btn btn-small btn-primary">Selecionar</a></td>

                </tr>
            </tbody>
        </table>
</div>
</div>

<!-- FOOTER -->
<!--div class="modal-footer">
    <button type="button" ng-click="$ctrl.handleClose()" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
    <button type="button" class="btn btn-primary">Save changes</button>
  </div-->`,
    bindings: {
        $close: '&',
        $dismiss: '&',
        modalData: '<',
        //tarefa: '<'
    },
    controller: ['$http', 'consts', 'Customer', function($http, consts, Customer) {
        var $ctrl = this;

        $ctrl.Filter = {
            id : '',
            name :  ''
        }

        $ctrl.searchCustomer = () => {
            const a = Customer.searchCustomer($ctrl.Filter.id, $ctrl.Filter.name)
            $ctrl.lista = a.$$state
            console.log('CHAMEI')
        }

        $ctrl.handleClose = function(id, name) {
            console.info("in handle close");
            $ctrl.$close({
                result: {
                    id, 
                    name
                }                
            });
        };

        $ctrl.handleDismiss = function() {
            console.info("in handle dismiss");
            $ctrl.$dismiss({
                reason: 'cancel'
            });
        };
    }],
});
