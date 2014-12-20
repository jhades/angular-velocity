///////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Makes a page element horizontally draggable.
// Allows a minimum and maximum drag position to be specified.
//
// When the drag is completed, a callback is invoked passing the final client X of the dragged element.
//
///////////////////////////////////////////////////////////////////////////////////////////////////////////

angular.module('ngvDraggable', [])
    .directive('ngvDraggable', function ($document) {
        return {
            scope: {
                minDragPosition: '@',
                maxDragPosition: '@',
                onDragCompleted: '&'
            },
            controller: function ($scope, $element) {

                function dragToMousePosition($event) {

                    var x = $event.clientX;
                    if (x >= $scope.minDragPosition && x <= $scope.maxDragPosition) {
                        $scope.latestDragPosition = x;
                        $element.css({
                            left: ($scope.latestDragPosition - 8.5) + 'px' // 8.5 is the width of the arrow cursor
                        });
                    }
                }

                $scope.isInRange = function (x) {
                    var isInRange = true;
                    if ($scope.minDragPosition && x <= $scope.minDragPosition) {
                        isInRange = false;
                    }
                    if (isInRange && $scope.maxDragPosition && x >= $scope.maxDragPosition) {
                        isInRange = false;
                    }
                    return isInRange;
                }

                function onDragCompleted() {
                    $document.off('mousemove', dragToMousePosition);
                    $document.off('mouseup', onDragCompleted);

                    var finalClientX,
                        pos = $scope.latestDragPosition;

                    if ($scope.isInRange(pos)) {
                        finalClientX = pos;
                    }
                    else if (pos >= $scope.maxDragPosition) {
                        finalClientX = $scope.maxDragPosition;
                    }
                    else if (pos <= $scope.minDragPosition) {
                        finalClientX = $scope.minDragPosition;
                    }

                    $scope.onDragCompleted({newClientX: finalClientX});

                }

                // on mouse down, start the drag
                $element.on('mousedown', function ($event) {
                    $event.preventDefault();
                    startX = $event.clientX;

                    $document.on('mousemove', dragToMousePosition);
                    $document.on('mouseup', onDragCompleted);
                });

            }
        };
    });