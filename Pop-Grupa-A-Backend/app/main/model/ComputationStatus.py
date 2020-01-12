from enum import Enum


class ComputationStatus(Enum):
    SUBMITTED = 1
    ACTIVATED = 2
    ASSIGNED = 3
    WORKING = 4
    COMPLETED = 5
    FAILED = 6
    REJECTED = 7
    ABORTED = 8
    PAUSED = 9
    INTERACTION_REQUIRED = 10

    def __str__(self):
        return self.name