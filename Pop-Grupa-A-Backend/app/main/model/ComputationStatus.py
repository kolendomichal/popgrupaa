from enum import Enum


class ComputationStatus(Enum):
    SUBMITTED = 1
    ASSIGNED = 2
    WORKING = 3
    COMPLETED = 4
    FAILED = 5
    REJECTED = 6
    ABORTED = 7
    PAUSED = 8
    INTERACTION_REQUIRED = 9

    def __str__(self):
        return self.name