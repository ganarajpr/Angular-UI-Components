

function FlashController($scope,$http)
{
    $http.get('data.json').success(function(data) {
        $scope.data = data;
    });
}

function ItemController($scope)
{
    $scope.itemClass = "item ";
    if($scope.ad.width > 300)
    {
        $scope.itemClass += "col3";
    }
    else if ($scope.ad.width > 160)
    {
        $scope.itemClass += "col2";
    }
    else
    {
        $scope.itemClass += "col1";
    }
}

function DisplayController($scope)
{
    $scope.component = "flash";

    $scope.setComponent = function(val)
    {
        $scope.component =val;
    }
}